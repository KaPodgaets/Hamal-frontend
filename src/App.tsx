import { Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import ProtectedRoute from './components/layout/ProtectedRoute'
import AdminRoute from './components/layout/AdminRoute'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import OperatorDashboard from './pages/OperatorDashboard'
import AdminPanel from './pages/AdminPanel'
import NotFoundPage from './pages/NotFoundPage'
import CitizenFormPage from './pages/CitizenFormPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<OperatorDashboard />} />
          <Route path="/form/:citizenId" element={<CitizenFormPage />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
