interface HeaderProps {
  onClose: () => void
}

const Header = ({ onClose }: HeaderProps) => {
  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="absolute top-4 left-4 right-4 bg-gray-800 bg-opacity-95 border border-gray-600 rounded-lg p-4 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold text-yellow-400">🌟 Social Galaxy</div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          <button className="px-3 py-2 text-left border border-gray-500 bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors">Galaxy View</button>
          <button className="px-3 py-2 text-left border border-gray-500 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 transition-colors">Add Contact</button>
          <button className="px-3 py-2 text-left border border-gray-500 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 transition-colors">Systems</button>
          <button className="px-3 py-2 text-left border border-gray-500 bg-gray-600 text-gray-300 rounded hover:bg-gray-500 transition-colors">Settings</button>
        </nav>
      </div>
    </div>
  )
}

export default Header 