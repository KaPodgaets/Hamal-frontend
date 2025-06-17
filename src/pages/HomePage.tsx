import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const HomePage = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (isAdmin) {
    return <Navigate to="/admin" replace />
  }

  return <Navigate to="/dashboard" replace />
}

export default HomePage 