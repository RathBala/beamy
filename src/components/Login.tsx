import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const { signIn } = useAuth()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 gap-6">
      <h1 className="text-3xl font-bold">Welcome to Beamy 🌟</h1>
      <button
        onClick={signIn}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow text-white text-lg transition-colors"
      >
        Sign in with Google
      </button>
    </div>
  )
}

export default Login 