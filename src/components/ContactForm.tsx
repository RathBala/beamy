import React from 'react'
import type { FormEvent, MouseEvent as ReactMouseEvent } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { SystemData } from '../hooks/useSystems'
import { useAuth } from '../contexts/AuthContext'

interface ContactFormProps {
  systems: SystemData[]
  onClose: () => void
}

const ContactForm = ({ systems, onClose }: ContactFormProps) => {
  const { user } = useAuth()
  const [name, setName] = React.useState('')
  const [type, setType] = React.useState('')
  const [closeness, setCloseness] = React.useState(50) // 0-100 scale

  const [selectedSystemId, setSelectedSystemId] = React.useState<string>('')
  const [newSystemName, setNewSystemName] = React.useState('')

  // Store any error messages so we can surface them in the UI for easier debugging
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const isCreatingNewSystem = selectedSystemId === 'NEW_SYSTEM'

  // Contact types
  const contactTypes = [
    'Partner', 'Spouse', 'Father', 'Mother', 'Brother', 'Sister', 'Son', 'Daughter',
    'Grandfather', 'Grandmother', 'Uncle', 'Aunt', 'Cousin', 'Friend', 'Best Friend',
    'Colleague', 'Boss', 'Manager', 'Mentor', 'Teacher', 'Student', 'Neighbor',
    'Acquaintance', 'Client', 'Doctor', 'Therapist', 'Other'
  ]

  // Closeness labels
  const getClosenessLabel = (value: number): string => {
    if (value < 25) return 'Not Close'
    if (value < 50) return 'Somewhat Close'
    if (value < 75) return 'Close'
    return 'Very Close'
  }

  // Star size based on closeness
  const getStarSize = (value: number): number => {
    const minSize = 16
    const maxSize = 32
    return minSize + (value / 100) * (maxSize - minSize)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      setErrorMessage('You need to be logged in to save a contact.')
      return
    }

    let systemId = selectedSystemId

    try {
      // 1️⃣ Create a new system first if the user chose that option
      if (isCreatingNewSystem) {
        const sysRef = await addDoc(collection(db, 'users', user.uid, 'systems'), {
          name: newSystemName || 'Untitled System',
          createdAt: serverTimestamp()
        })
        systemId = sysRef.id
      }

      // 2️⃣ If no system was selected/created, automatically create or use a default system
      if (!systemId) {
        const defaultSystemRef = await addDoc(collection(db, 'users', user.uid, 'systems'), {
          name: 'General',
          createdAt: serverTimestamp()
        })
        systemId = defaultSystemRef.id
      }

      // 3️⃣ Add contact inside that system
      await addDoc(collection(db, 'users', user.uid, 'systems', systemId, 'contacts'), {
        name,
        type,
        closeness,
        createdAt: serverTimestamp()
      })

      onClose()
    } catch (err) {
      console.error('Error saving contact', err)
      // Show the error to the user so they know what went wrong
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage(String(err))
      }
    }
  }

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="bg-gray-800 w-96 p-6 rounded-lg border border-gray-700 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-2">Add New Contact</h2>

        {/* Display any error that occurred while trying to save */}
        {errorMessage && (
          <div className="bg-red-900 text-red-300 px-3 py-2 rounded-md border border-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-300 mb-1">Name *</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Type *</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>Select relationship type</option>
            {contactTypes.map((t: string) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Social System *</label>
          <select
            value={selectedSystemId}
            onChange={(e) => setSelectedSystemId(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            <option value="" disabled>Select an option</option>
            {systems.map((sys) => (
              <option key={sys.id} value={sys.id}>{sys.name}</option>
            ))}
            <option value="NEW_SYSTEM">➕ Create new system...</option>
          </select>
        </div>

        {isCreatingNewSystem && (
          <div>
            <label className="block text-sm text-gray-300 mb-1">New System Name *</label>
            <input
              type="text"
              required
              value={newSystemName}
              onChange={(e) => setNewSystemName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>
        )}

        <div>
          <label className="block text-sm text-gray-300 mb-2">Closeness</label>
          <div className="flex items-center space-x-4">
            {/* Draggable star */}
            <div className="relative flex-1 h-12 bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 cursor-grab active:cursor-grabbing"
                style={{ 
                  left: `${closeness}%`,
                  transform: `translateX(-50%) translateY(-50%)`
                }}
                onMouseDown={(e: ReactMouseEvent) => {
                  e.preventDefault()
                  const rect = e.currentTarget.parentElement!.getBoundingClientRect()
                  const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
                    const x = moveEvent.clientX - rect.left
                    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
                    setCloseness(Math.round(percentage))
                  }
                  const handleMouseUp = () => {
                    document.removeEventListener('mousemove', handleMouseMove)
                    document.removeEventListener('mouseup', handleMouseUp)
                  }
                  document.addEventListener('mousemove', handleMouseMove)
                  document.addEventListener('mouseup', handleMouseUp)
                }}
              >
                <div 
                  className="bg-yellow-400 rounded-full shadow-lg flex items-center justify-center text-yellow-900 font-bold text-xs transition-all duration-200"
                  style={{ 
                    width: `${getStarSize(closeness)}px`,
                    height: `${getStarSize(closeness)}px`,
                    boxShadow: `0 0 ${closeness / 5}px rgba(251, 191, 36, 0.6)`
                  }}
                >
                  <div 
                    className="w-full h-full rounded-full bg-yellow-400"
                    style={{
                      boxShadow: `
                        0 0 ${closeness / 3}px rgba(251, 191, 36, 0.8),
                        0 0 ${closeness / 2}px rgba(251, 191, 36, 0.6),
                        0 0 ${closeness}px rgba(251, 191, 36, 0.4),
                        inset 0 0 ${closeness / 4}px rgba(255, 255, 255, 0.3)
                      `
                    }}
                  />
                </div>
              </div>
              {/* Track gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-yellow-600 to-yellow-400 opacity-30"></div>
            </div>
            <div className="text-sm text-gray-300 min-w-[100px]">
              {getClosenessLabel(closeness)}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-200">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 rounded-md text-gray-900 font-semibold">Save</button>
        </div>
      </form>
    </div>
  )
}

export default ContactForm; 