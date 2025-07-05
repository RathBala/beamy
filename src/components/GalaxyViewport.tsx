import TwinklingStars from './TwinklingStars'
import ContactConstellation from './ContactConstellation'
import { SystemData } from '../hooks/useSystems'

interface Position {
  x: number
  y: number
}

interface GalaxyViewportProps {
  pan: Position
  systems: SystemData[]
}

const GalaxyViewport = ({ pan, systems }: GalaxyViewportProps) => {

  // Pre-baked positions for up to 8 systems; beyond that we fall back to random spots.
  const predefinedPositions = [
    'top-32 left-32',
    'top-32 right-40',
    'bottom-32 left-1/2 transform -translate-x-1/2',
    'top-1/2 left-20 transform -translate-y-1/2',
    'bottom-40 right-40',
    'top-40 left-1/2 transform -translate-x-1/2',
    'bottom-20 left-20',
    'top-1/4 right-1/4'
  ]

  // Helper to pick position for system index
  const getPositionForIndex = (sys: SystemData, idx: number) => {
    // Contacts without a system should hover right around "YOU"
    if (sys.id === 'NO_SYSTEM') {
      return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    }

    if (idx < predefinedPositions.length) return predefinedPositions[idx]
    const randX = Math.floor(Math.random() * 80) + 10 // between 10 and 90
    const randY = Math.floor(Math.random() * 80) + 10
    return `top-[${randY}vh] left-[${randX}vw]`
  }

  // Generate star objects for contacts
  const buildStars = (contacts: any[]) => {
    return contacts.map((c: any, i: number) => {
      const sizes = ['w-3 h-3', 'w-4 h-4', 'w-5 h-5', 'w-6 h-6']
      const size = sizes[i % sizes.length]
      // Use system colour or generic yellow
      const color = c.colorClass || 'bg-yellow-400 text-yellow-400'
      const top = Math.floor(Math.random() * 120)
      const left = Math.floor(Math.random() * 120)
      return {
        size,
        color,
        position: `top-[${top}px] left-[${left}px]`
      }
    })
  }

  return (
    <main className="relative w-full h-full overflow-hidden">
      {/* Container that moves with drag */}
      <div 
        className="relative w-full h-full"
        style={{ 
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          transition: 'none' // Disable transition during drag
        }}
      >
        {/* Twinkling Background Stars */}
        <TwinklingStars />

        {/* Galaxy Center - You */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-8 h-8 bg-yellow-400 central-star flex items-center justify-center text-gray-900 font-bold text-xs text-yellow-900 rounded-full shadow-md">
            YOU
          </div>
        </div>

        {/* Dynamically render systems & contacts */}
        {systems.map((sys, idx) => (
          <ContactConstellation
            key={sys.id}
            position={getPositionForIndex(sys, idx)}
            title={sys.name}
            titleColor="text-yellow-300"
            stars={buildStars(sys.contacts)}
            nebulaColor="bg-yellow-600"
            nebulaSize="-inset-6"
          />
        ))}
      </div>
    </main>
  )
}

export default GalaxyViewport 