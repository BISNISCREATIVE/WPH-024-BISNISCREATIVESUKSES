"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  profileLikes: number
  incrementProfileLikes: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLikes, setProfileLikes] = useState(0)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem("auth_token")
    const userData = localStorage.getItem("user_data")

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      const mockUser: User = {
        id: "user-123",
        name: "John Doe",
        email: email,
        avatar: "/image-6.png",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      // Store in localStorage
      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
    } catch (error) {
      throw new Error("Login failed")
    }
  }

  const register = async (name: string, email: string, password: string) => {
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful registration
      const mockUser: User = {
        id: "user-" + Date.now(),
        name: name,
        email: email,
        avatar: "/image-6.png",
      }

      const mockToken = "mock-jwt-token-" + Date.now()

      // Store in localStorage
      localStorage.setItem("auth_token", mockToken)
      localStorage.setItem("user_data", JSON.stringify(mockUser))

      setUser(mockUser)
    } catch (error) {
      throw new Error("Registration failed")
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    setUser(null)
  }

  const incrementProfileLikes = () => {
    setProfileLikes((prev) => prev + 1)
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading, profileLikes, incrementProfileLikes }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
