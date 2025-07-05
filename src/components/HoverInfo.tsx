const HoverInfo = () => {
  return (
    <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-gray-800 bg-opacity-95 border-2 border-yellow-500 p-3 rounded-lg max-w-xs opacity-50 backdrop-blur-sm">
      <div className="text-yellow-400 font-bold text-sm mb-1">[Hover Info]</div>
      <div className="text-white text-sm">Sarah Martinez</div>
      <div className="text-gray-300 text-xs">Family • Sister</div>
      <div className="text-gray-300 text-xs mt-1">Strength: ⭐⭐⭐⭐⭐</div>
      <div className="text-gray-300 text-xs">Last contact: 2 days ago</div>
      <div className="flex gap-1 mt-2">
        <div className="w-2 h-2 bg-red-400 star-small text-red-400"></div>
        <div className="w-2 h-2 bg-green-400 star-small text-green-400"></div>
      </div>
    </div>
  )
}

export default HoverInfo 