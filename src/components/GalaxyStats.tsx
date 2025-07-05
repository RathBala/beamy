const GalaxyStats = () => {
  return (
    <div className="absolute top-20 right-4 z-20 bg-gray-800 bg-opacity-90 border-2 border-gray-600 p-4 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-3 text-yellow-400">Galaxy Scope</h3>
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