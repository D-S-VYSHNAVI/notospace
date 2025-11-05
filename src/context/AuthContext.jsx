import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Base URL of your backend
  const API_BASE = 'http://localhost:5000/api'

  // Load stored user on first render
  useEffect(() => {
    const stored = localStorage.getItem('notospace_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  // Save user to localStorage when logged in
  useEffect(() => {
    if (user) localStorage.setItem('notospace_user', JSON.stringify(user))
    else localStorage.removeItem('notospace_user')
  }, [user])

  // 🔐 Login (calls backend)
  const login = async (role, name, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        role,
        name,
        password,
      })

      if (res.data.success) {
        setUser(res.data.user)
        return { success: true }
      } else {
        return { success: false, message: res.data.message }
      }
    } catch (err) {
      console.error('Login failed:', err)
      return { success: false, message: 'Server error. Try again later.' }
    }
  }

  // 🧾 Signup (optional)
  const signup = async (role, name, password) => {
    try {
      const res = await axios.post(`${API_BASE}/auth/signup`, {
        role,
        name,
        password,
      })

      if (res.data.success) {
        setUser(res.data.user)
        return { success: true }
      } else {
        return { success: false, message: res.data.message }
      }
    } catch (err) {
      console.error('Signup failed:', err)
      return { success: false, message: 'Server error. Try again later.' }
    }
  }

  // 🚪 Logout
  const logout = () => {
    setUser(null)
    localStorage.removeItem('notospace_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
