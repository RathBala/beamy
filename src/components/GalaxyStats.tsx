interface GalaxyStatsProps {
  onClose: () => void
}

const GalaxyStats = ({ onClose }: GalaxyStatsProps) => {
  return (
    <div className="fixed top-16 right-4 z-30 bg-gray-800 bg-opacity-95 border border-gray-600 rounded-lg p-4 backdrop-blur-sm shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold text-yellow-400">Galaxy Scope</h3>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-300">Total Stars:</span>
          <span className="text-white font-bold">18</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Systems:</span>
          <span className="text-white font-bold">4</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Bright Stars:</span>
          <span className="text-white font-bold">12</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-300">Dim Stars:</span>
          <span className="text-white font-bold">6</span>
        </div>
      </div>
    </div>
  )
}

export default GalaxyStats 