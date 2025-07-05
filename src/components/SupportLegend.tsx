import React from 'react'
void React;

interface SupportLegendProps {
  onClose: () => void
}

const SupportLegend = ({ onClose }: SupportLegendProps) => {
  return (
    <div className="fixed top-16 right-32 z-30 bg-gray-800 bg-opacity-95 border border-gray-600 rounded-lg p-4 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-yellow-400">Support Types</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="text-gray-300">Emotional</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
          <span className="text-gray-300">Practical</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span className="text-gray-300">Social</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
          <span className="text-gray-300">Informational</span>
        </div>
      </div>
    </div>
  )
}

export default SupportLegend 