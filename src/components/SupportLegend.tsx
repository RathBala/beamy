const SupportLegend = () => {
  return (
    <div className="absolute bottom-4 right-4 z-20 bg-gray-800 bg-opacity-90 border-2 border-gray-600 p-4 rounded-lg backdrop-blur-sm">
      <h3 className="text-lg font-bold mb-3 text-yellow-400">Support Types</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-400 star-small text-red-400"></div>
          <span className="text-gray-300">Emotional</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-400 star-small text-blue-400"></div>
          <span className="text-gray-300">Practical</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 star-small text-green-400"></div>
          <span className="text-gray-300">Social</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-400 star-small text-purple-400"></div>
          <span className="text-gray-300">Informational</span>
        </div>
      </div>
    </div>
  )
}

export default SupportLegend 