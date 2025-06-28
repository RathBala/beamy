import React from 'react'
import TwinklingStars from './TwinklingStars'
import ContactConstellation from './ContactConstellation'

interface Position {
  x: number
  y: number
}

interface GalaxyViewportProps {
  pan: Position
}

const GalaxyViewport: React.FC<GalaxyViewportProps> = ({ pan }) => {
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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-yellow-400 central-star flex items-center justify-center text-gray-900 font-bold text-xs text-yellow-400">
            YOU
          </div>
        </div>

        {/* Family Constellation (Top Left) */}
        <ContactConstellation
          position="top-32 left-32"
          title="Family Constellation"
          titleColor="text-yellow-300"
          stars={[
            { size: 'w-6 h-6', color: 'bg-red-400 text-red-400', position: 'top-0 left-0' },
            { size: 'w-5 h-5', color: 'bg-red-300 text-red-300', position: 'top-8 left-6' },
            { size: 'w-4 h-4', color: 'bg-pink-400 text-pink-400', position: 'top-4 left-12' },
            { size: 'w-3 h-3', color: 'bg-red-500 text-red-500', position: 'top-12 left-2' }
          ]}
          nebulaColor="bg-red-500"
          nebulaSize="-inset-6"
        />

        {/* Work System (Top Right) */}
        <ContactConstellation
          position="top-40 right-40"
          title="Corporate System"
          titleColor="text-blue-300"
          stars={[
            { size: 'w-5 h-5', color: 'bg-blue-400 text-blue-400', position: 'top-0 left-0' },
            { size: 'w-4 h-4', color: 'bg-cyan-400 text-cyan-400', position: 'top-6 left-8' },
            { size: 'w-3 h-3', color: 'bg-blue-300 text-blue-300', position: 'top-2 left-12' },
            { size: 'w-4 h-4', color: 'bg-indigo-400 text-indigo-400', position: 'top-10 left-4' }
          ]}
          nebulaColor="bg-blue-500"
          nebulaSize="-inset-6"
        />

        {/* Friends Nebula (Bottom Center) */}
        <ContactConstellation
          position="bottom-32 left-1/2 transform -translate-x-1/2"
          title="Social Nebula"
          titleColor="text-green-300"
          stars={[
            { size: 'w-5 h-5', color: 'bg-green-400 text-green-400', position: 'top-0 left-0' },
            { size: 'w-6 h-6', color: 'bg-emerald-400 text-emerald-400', position: 'top-4 left-8' },
            { size: 'w-4 h-4', color: 'bg-lime-400 text-lime-400', position: 'top-8 left-2' },
            { size: 'w-5 h-5', color: 'bg-teal-400 text-teal-400', position: 'top-2 left-16' },
            { size: 'w-3 h-3', color: 'bg-green-300 text-green-300', position: 'top-12 left-12' }
          ]}
          nebulaColor="bg-green-500"
          nebulaSize="-inset-8"
          nebulaOpacity="opacity-8"
          nebulaBlur="blur-3xl"
        />

        {/* Mentors/Advisors (Left Side) */}
        <ContactConstellation
          position="top-1/2 left-20 transform -translate-y-1/2"
          title="Wisdom Stars"
          titleColor="text-purple-300"
          stars={[
            { size: 'w-5 h-5', color: 'bg-purple-400 text-purple-400', position: 'top-0 left-0' },
            { size: 'w-4 h-4', color: 'bg-violet-400 text-violet-400', position: 'top-8 left-4' }
          ]}
          nebulaColor="bg-purple-500"
          nebulaSize="-inset-4"
          nebulaBlur="blur-xl"
        />
      </div>
    </main>
  )
}

export default GalaxyViewport 