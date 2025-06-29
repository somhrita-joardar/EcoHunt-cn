"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame } from "lucide-react"

interface StreakCounterProps {
  userId: string
}

export function StreakCounter({ userId }: StreakCounterProps) {
  const [streak] = useState(7) // Hardcoded streak for demo
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 500)
  }, [userId])

  const getStreakColor = (streak: number) => {
    if (streak >= 30) return "text-red-500"
    if (streak >= 7) return "text-orange-500"
    if (streak >= 3) return "text-yellow-500"
    return "text-gray-500"
  }

  const getStreakMessage = (streak: number) => {
    if (streak === 0) return "Start your streak today!"
    if (streak === 1) return "Great start! Keep it up!"
    if (streak < 7) return "Building momentum!"
    if (streak < 30) return "You're on fire! 🔥"
    return "Legendary streak! 🏆"
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flame className={`w-6 h-6 ${getStreakColor(streak)}`} />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{streak}</span>
                <Badge variant="outline" className="text-xs">
                  Day{streak !== 1 ? "s" : ""}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{getStreakMessage(streak)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">Current Streak</div>
            {streak >= 7 && <Badge className="bg-orange-500 hover:bg-orange-600 text-xs">🔥 Hot Streak!</Badge>}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
