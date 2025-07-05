import GalaxyView from './components/GalaxyView'
import Login from './components/Login'
import { useAuth } from './contexts/AuthContext'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
        Loading...
      </div>
    )
  }

  if (!user) {
    return <Login />
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900 text-gray-100 leading-relaxed">
      <GalaxyView />
    </div>
  )
}

export default App 