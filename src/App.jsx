import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const authStatus = localStorage.getItem('isAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
    setLoading(false)
  }, [])

  const handleLogin = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', 'true')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  return (
    <Routes>
      <Route 
        path="/signup" 
        element={!isAuthenticated ? <SignUp onSignUp={handleLogin} /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/signin" 
        element={!isAuthenticated ? <SignIn onSignIn={handleLogin} /> : <Navigate to="/dashboard" />} 
      />
      <Route 
        path="/dashboard" 
        element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/signin" />} 
      />
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/signin"} />} />
    </Routes>
  )
}

export default App

