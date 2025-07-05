import { useEffect, useState } from 'react'
import { collection, onSnapshot, getDocs, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
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

    // References to the collections
    const systemsRef = collection(db, 'users', uid, 'systems')
    const rootContactsRef = collection(db, 'users', uid, 'contacts')

    // Helper that (re)assembles all systems + root-level contacts
    const buildSystemsSnapshot = async () => {
      const sysWithContacts: SystemData[] = []

      // 1️⃣ Fetch systems and their contacts
      const systemsSnap = await getDocs(systemsRef)

      await Promise.all(
        systemsSnap.docs.map(async (docSnap: QueryDocumentSnapshot<DocumentData>) => {
          const systemId = docSnap.id
          const systemData = docSnap.data() as DocumentData

          const contactsCol = collection(db, 'users', uid, 'systems', systemId, 'contacts')
          const contactsSnap = await getDocs(contactsCol)

          const contacts: Contact[] = contactsSnap.docs.map((c: QueryDocumentSnapshot<DocumentData>) => ({ id: c.id, ...(c.data() as DocumentData) })) as Contact[]

          sysWithContacts.push({
            id: systemId,
            name: systemData.name || 'Untitled',
            color: systemData.color,
            contacts
          })
        })
      )

      // 2️⃣ Fetch contacts that don't belong to any social system
      const rootContactsSnap = await getDocs(rootContactsRef)
      if (!rootContactsSnap.empty) {
        const rootContacts: Contact[] = rootContactsSnap.docs.map((c: QueryDocumentSnapshot<DocumentData>) => ({ id: c.id, ...(c.data() as DocumentData) })) as Contact[]

        sysWithContacts.push({
          id: 'NO_SYSTEM',
          name: '', // No label – these contacts will appear near "YOU"
          contacts: rootContacts
        })
      }

      setSystems(sysWithContacts)
    }

    // Listen for realtime changes in both collections. Whenever either changes we rebuild.
    const unsubSystems = onSnapshot(systemsRef, buildSystemsSnapshot)
    const unsubRoot = onSnapshot(rootContactsRef, buildSystemsSnapshot)

    // Initial fetch
    buildSystemsSnapshot()

    return () => {
      unsubSystems()
      unsubRoot()
    }
  }, [uid])

  return systems
} 