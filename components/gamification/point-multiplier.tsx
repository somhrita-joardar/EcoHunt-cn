"use client"

import { Badge } from "@/components/ui/badge"
import { getPointMultiplier } from "@/lib/gamification"
import { Zap } from "lucide-react"

interface PointMultiplierProps {
  streak: number
  level: number
  showDetails?: boolean
}

export function PointMultiplier({ streak, level, showDetails = true }: PointMultiplierProps) {
  const multiplier = getPointMultiplier(streak, level)

  if (multiplier === 1) return null

  return (
    <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">
      <Zap className="w-3 h-3 mr-1" />
      {multiplier}x Multiplier
      {showDetails && (
        <span className="ml-1 text-xs opacity-80">
          (Streak: {streak}, Level: {level})
        </span>
      )}
    </Badge>
  )
}
