import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // In a real application, you would:
    // 1. Hash the password
    // 2. Save user to database
    // 3. Create a session/JWT token

    // For demo purposes, we'll just return success
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      points: 0,
      level: 1,
      createdAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      user,
      message: "User registered successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 500 })
  }
}
