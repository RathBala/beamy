import { useEffect, useState } from 'react'
import { collection, onSnapshot, getDocs, query, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  [key: string]: any
}

export interface SystemData {
  id: string
  name: string
  contacts: Contact[]
  color?: string
  [key: string]: any
}

/**
 * Realtime hook that returns all social systems for a user together
 * with the contacts inside each system.
 */
export const useSystems = (uid?: string | null) => {
  const [systems, setSystems] = useState<SystemData[]>([])

  useEffect(() => {
    if (!uid) {
      setSystems([])
      return
    }

    // Reference to the user's systems collection
    const systemsRef = collection(db, 'users', uid, 'systems')
    const q = query(systemsRef)

    // Listen for realtime changes to systems
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const sysWithContacts: SystemData[] = []

      // Fetch contacts for each system in parallel
      await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const systemId = docSnap.id
          const systemData = docSnap.data() as DocumentData

          // Fetch contacts inside this system
          const contactsCol = collection(db, 'users', uid, 'systems', systemId, 'contacts')
          const contactsSnap = await getDocs(contactsCol)

          const contacts: Contact[] = contactsSnap.docs.map((c) => ({ id: c.id, ...(c.data() as DocumentData) })) as Contact[]

          sysWithContacts.push({
            id: systemId,
            name: systemData.name || 'Untitled',
            color: systemData.color,
            contacts
          })
        })
      )

      setSystems(sysWithContacts)
    })

    return () => unsubscribe()
  }, [uid])

  return systems
} 