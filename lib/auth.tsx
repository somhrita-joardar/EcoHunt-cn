"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  points: number
  level: number
  missionsCompleted: number
  ecoActions: number
  rank: number
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
  updateUserStats: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Try multiple possible backend URLs
const POSSIBLE_BACKEND_URLS = ["http://localhost:5000", "http://127.0.0.1:5000"]

let WORKING_API_URL: string | null = null

// Fallback demo users for when backend is not available
const DEMO_USERS = [
  {
    id: "user-1",
    name: "Alice Green",
    email: "alice@ecohunt.com",
    password: "password123",
    points: 1247,
    level: 5,
    missionsCompleted: 23,
    ecoActions: 156,
    rank: 12,
  },
  {
    id: "user-2",
    name: "Bob Earth",
    email: "bob@ecohunt.com",
    password: "password123",
    points: 892,
    level: 4,
    missionsCompleted: 18,
    ecoActions: 98,
    rank: 25,
  },
  {
    id: "user-3",
    name: "Carol Nature",
    email: "carol@ecohunt.com",
    password: "password123",
    points: 1456,
    level: 6,
    missionsCompleted: 31,
    ecoActions: 203,
    rank: 8,
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("ecohunt-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const findWorkingBackend = async (): Promise<string | null> => {
    if (WORKING_API_URL) {
      return WORKING_API_URL
    }

    console.log("🔍 Testing backend URLs...")

    for (const url of POSSIBLE_BACKEND_URLS) {
      try {
        console.log(`🧪 Testing: ${url}`)

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        const response = await fetch(`${url}/allusers`, {
          method: "GET",
          signal: controller.signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        })

        clearTimeout(timeoutId)

        if (response.ok) {
          console.log(`✅ ${url} is working`)
          WORKING_API_URL = url
          return url
        }
      } catch (error) {
        console.log(`❌ ${url} failed:`, error)
        continue
      }
    }

    console.log("❌ No working backend found")
    return null
  }

  const parseUsersResponse = (data: any): any[] => {
    console.log("🔍 Parsing users response:", typeof data, data)

    // Handle different response formats
    if (Array.isArray(data)) {
      console.log("✅ Data is already an array")
      return data
    }

    // If it's an object with a users property
    if (data && typeof data === "object" && Array.isArray(data.users)) {
      console.log("✅ Found users array in data.users")
      return data.users
    }

    // If it's an object with a data property
    if (data && typeof data === "object" && Array.isArray(data.data)) {
      console.log("✅ Found users array in data.data")
      return data.data
    }

    // If it's an object with user records as values
    if (data && typeof data === "object") {
      const values = Object.values(data)
      if (values.length > 0 && values.every((item) => typeof item === "object" && item !== null)) {
        console.log("✅ Converting object values to array")
        return values
      }
    }

    // If it's a single user object, wrap it in an array
    if (data && typeof data === "object" && data.email) {
      console.log("✅ Single user object, wrapping in array")
      return [data]
    }

    console.log("❌ Could not parse users data, returning empty array")
    return []
  }

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    console.log("🔐 Starting login process for:", email)
    setIsLoading(true)

    try {
      const backendUrl = await findWorkingBackend()

      if (backendUrl) {
        console.log("🌐 Using backend authentication")

        const response = await fetch(`${backendUrl}/allusers`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        })

        if (response.ok) {
          const rawData = await response.json()
          const users = parseUsersResponse(rawData)

          console.log("👥 Retrieved users from backend:", users.length, "users")

          const foundUser = users.find((u: any) => u.email === email && u.password === password)

          if (foundUser) {
            console.log("✅ User found in backend")
            const { password: _, ...userWithoutPassword } = foundUser

            const sortedUsers = users.sort((a: any, b: any) => (b.points || 0) - (a.points || 0))
            const rank = sortedUsers.findIndex((u: any) => u.id === foundUser.id) + 1

            const userWithRank = {
              ...userWithoutPassword,
              rank,
              points: foundUser.points || 0,
              level: foundUser.level || 1,
              missionsCompleted: foundUser.missionsCompleted || 0,
              ecoActions: foundUser.ecoActions || 0,
            }

            setUser(userWithRank)
            localStorage.setItem("ecohunt-user", JSON.stringify(userWithRank))
            setIsLoading(false)
            return { success: true }
          } else {
            console.log("❌ User not found in backend")
            setIsLoading(false)
            return { success: false, error: "Invalid email or password" }
          }
        }
      }

      // Fallback to demo mode
      console.log("🎭 Using demo authentication")
      const foundUser = DEMO_USERS.find((u) => u.email === email && u.password === password)

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("ecohunt-user", JSON.stringify(userWithoutPassword))
        setIsLoading(false)
        return { success: true }
      } else {
        setIsLoading(false)
        return { success: false, error: "Invalid email or password (demo mode)" }
      }
    } catch (error) {
      console.error("❌ Login error:", error)
      setIsLoading(false)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; error?: string }> => {
    console.log("📝 Starting registration process for:", email)
    setIsLoading(true)

    try {
      const backendUrl = await findWorkingBackend()

      if (backendUrl) {
        console.log("🌐 Using backend registration")

        // First check if user already exists
        console.log("🔍 Checking if user already exists...")
        const usersResponse = await fetch(`${backendUrl}/allusers`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
        })

        if (usersResponse.ok) {
          const rawData = await usersResponse.json()
          const existingUsers = parseUsersResponse(rawData)

          console.log("👥 Existing users count:", existingUsers.length)
          console.log("📋 Sample user structure:", existingUsers[0] || "No users found")

          const existingUser = existingUsers.find((u: any) => u && u.email === email)

          if (existingUser) {
            console.log("❌ User already exists")
            setIsLoading(false)
            return { success: false, error: "User with this email already exists" }
          }
        } else {
          console.log("⚠️ Could not fetch existing users, proceeding with registration")
        }

        // Create new user object
        const newUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          points: 0,
          level: 1,
          missionsCompleted: 0,
          ecoActions: 0,
        }

        console.log("📤 Sending new user to backend:", { ...newUser, password: "[HIDDEN]" })
        console.log("🎯 POST URL:", `${backendUrl}/adduser`)

        // Try the POST request with detailed error handling
        try {
          const response = await fetch(`${backendUrl}/adduser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            mode: "cors",
            body: JSON.stringify(newUser),
          })

          console.log("📥 POST Response:", {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
            headers: Object.fromEntries(response.headers.entries()),
          })

          if (response.ok) {
            console.log("✅ Registration successful")

            // Try to read the response
            let responseData = null
            try {
              const responseText = await response.text()
              console.log("📄 Raw response:", responseText)

              if (responseText) {
                responseData = JSON.parse(responseText)
                console.log("📄 Parsed response data:", responseData)
              }
            } catch (jsonError) {
              console.log("⚠️ Could not parse response as JSON, but request was successful")
            }

            // Remove password and add rank for local storage
            const { password: _, ...userWithoutPassword } = newUser
            const userWithRank = {
              ...userWithoutPassword,
              rank: 999,
            }

            setUser(userWithRank)
            localStorage.setItem("ecohunt-user", JSON.stringify(userWithRank))
            setIsLoading(false)
            return { success: true }
          } else {
            // Try to get error details
            let errorText = ""
            try {
              errorText = await response.text()
            } catch (e) {
              errorText = "Unknown error"
            }

            console.log("❌ POST request failed:", response.status, errorText)
            throw new Error(`Registration failed: ${response.status} - ${errorText}`)
          }
        } catch (postError) {
          console.log("❌ POST request error:", postError)

          // Check if it's a CORS error specifically
          if (postError instanceof TypeError && postError.message.includes("fetch")) {
            console.log("🚫 CORS error detected on POST request")
            throw new Error("CORS error: Your backend needs to allow POST requests from this domain")
          } else {
            throw postError
          }
        }
      } else {
        throw new Error("Backend not available")
      }
    } catch (error) {
      console.error("❌ Registration error:", error)

      console.log("🎭 Falling back to demo registration")

      // Fallback to demo registration
      const existingUser = DEMO_USERS.find((u) => u.email === email)
      const registeredUsers = JSON.parse(localStorage.getItem("demo-registered-users") || "[]")
      const existingDemoUser = registeredUsers.find((u: any) => u.email === email)

      if (existingUser || existingDemoUser) {
        setIsLoading(false)
        return { success: false, error: "User with this email already exists (demo mode)" }
      }

      // Create new demo user
      const newUser = {
        id: `user-${Date.now()}`,
        name,
        email,
        points: 0,
        level: 1,
        missionsCompleted: 0,
        ecoActions: 0,
        rank: 999,
      }

      // Store in localStorage as a "registered" user
      registeredUsers.push({ ...newUser, password })
      localStorage.setItem("demo-registered-users", JSON.stringify(registeredUsers))

      setUser(newUser)
      localStorage.setItem("ecohunt-user", JSON.stringify(newUser))
      setIsLoading(false)
      return { success: true }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("ecohunt-user")
  }

  const updateUserStats = async (updates: Partial<User>) => {
    if (!user) return

    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("ecohunt-user", JSON.stringify(updatedUser))
  }

  const contextValue: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    updateUserStats,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
