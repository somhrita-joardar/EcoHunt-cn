import { type NextRequest, NextResponse } from "next/server"

const missions = [
  {
    id: 1,
    title: "Recycling Hero",
    description: "Recycle 15 items this week",
    points: 150,
    difficulty: "Easy",
    category: "Waste Reduction",
    progress: 0,
    target: 15,
  },
  {
    id: 2,
    title: "Green Commuter",
    description: "Use public transport or bike for 7 days",
    points: 300,
    difficulty: "Medium",
    category: "Transportation",
    progress: 0,
    target: 7,
  },
  {
    id: 3,
    title: "Energy Saver",
    description: "Reduce electricity usage by 20% this month",
    points: 500,
    difficulty: "Hard",
    category: "Energy",
    progress: 0,
    target: 20,
  },
]

export async function GET() {
  return NextResponse.json({ missions })
}

export async function POST(request: NextRequest) {
  try {
    const { missionId, userId } = await request.json()

    // In a real application, you would:
    // 1. Validate user authentication
    // 2. Check if mission exists
    // 3. Add mission to user's active missions in database

    return NextResponse.json({
      success: true,
      message: "Mission started successfully",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to start mission" }, { status: 500 })
  }
}
