import React from 'react'
void React;

interface ControlPanelProps {
  onCenterGalaxy: () => void
}

const ControlPanel = ({ onCenterGalaxy }: ControlPanelProps) => {
  return (
    <div className="absolute bottom-4 left-4 z-20 bg-gray-800 bg-opacity-90 border-2 border-gray-600 p-4 rounded-lg max-w-xs backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-3 text-yellow-400">Galaxy Controls</h3>
      <div className="space-y-2 text-sm">
        <button className="wireframe-button w-full text-left bg-gray-700 border-gray-500 text-gray-200 hover:bg-gray-600">+ Add New Star</button>
        <button className="wireframe-button w-full text-left bg-gray-700 border-gray-500 text-gray-200 hover:bg-gray-600">🌌 Create System</button>
        <button 
          className="wireframe-button w-full text-left bg-gray-700 border-gray-500 text-gray-200 hover:bg-gray-600"
          onClick={onCenterGalaxy}
        >
          🎯 Center Galaxy
        </button>
        <div className="pt-2 border-t border-gray-600">
          <div className="text-xs text-gray-400 mb-1">Navigation:</div>
          <div className="text-xs text-gray-300">• Drag to explore</div>
          <div className="text-xs text-gray-300">• Scroll to zoom</div>
          <div className="text-xs text-gray-300">• Hover for details</div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel 