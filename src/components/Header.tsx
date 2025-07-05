const Header = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-gray-800 bg-opacity-80 border-b-2 border-gray-600 p-4 flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="text-2xl font-bold text-yellow-400">🌟 Social Galaxy</div>
      <nav className="flex flex-wrap gap-3 justify-center text-sm">
        <div className="px-3 py-2 border border-gray-500 bg-gray-700 text-gray-200">Galaxy View</div>
        <div className="px-3 py-2 border border-gray-500 bg-gray-600 text-gray-300">Add Contact</div>
        <div className="px-3 py-2 border border-gray-500 bg-gray-600 text-gray-300">Systems</div>
        <div className="px-3 py-2 border border-gray-500 bg-gray-600 text-gray-300">Settings</div>
      </nav>
    </header>
  )
}

export default Header 