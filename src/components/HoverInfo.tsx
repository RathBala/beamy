import React from 'react'
void React;

interface ContactData {
  name: string
  relationship: string
  category: string
  strength: number
  lastContact: string
  supportTypes: string[]
}

interface HoverInfoProps {
  contactData?: ContactData
  position?: { x: number; y: number }
}

const HoverInfo = ({ contactData, position }: HoverInfoProps) => {
  // Only render if we have contact data (i.e., user is hovering)
  if (!contactData) return null

  const strengthStars = '⭐'.repeat(contactData.strength)

  return (
    <div 
      className="fixed z-20 bg-gray-800 bg-opacity-95 border-2 border-yellow-500 p-3 rounded-lg max-w-xs backdrop-blur-sm pointer-events-none"
      style={{
        left: position?.x || 20,
        top: position?.y || '50%',
        transform: position ? 'translate(10px, -50%)' : 'translateY(-50%)'
      }}
    >
      <div className="text-yellow-400 font-bold text-sm mb-1">[Hover Info]</div>
      <div className="text-white text-sm">{contactData.name}</div>
      <div className="text-gray-300 text-xs">{contactData.category} • {contactData.relationship}</div>
      <div className="text-gray-300 text-xs mt-1">Strength: {strengthStars}</div>
      <div className="text-gray-300 text-xs">Last contact: {contactData.lastContact}</div>
      <div className="flex gap-1 mt-2">
        {contactData.supportTypes.map((type, index) => (
          <div 
            key={index}
            className={`w-2 h-2 rounded-full ${
              type === 'emotional' ? 'bg-red-400' :
              type === 'practical' ? 'bg-blue-400' :
              type === 'social' ? 'bg-green-400' :
              'bg-purple-400'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HoverInfo 