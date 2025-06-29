"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { getXPProgress } from "@/lib/gamification"

interface LevelProgressProps {
  points: number
  showDetails?: boolean
}

export function LevelProgress({ points, showDetails = true }: LevelProgressProps) {
  const { currentLevel, nextLevel, progress, pointsToNext } = getXPProgress(points)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            Level {currentLevel}
          </Badge>
          {showDetails && (
            <span className="text-sm text-gray-600">
              {pointsToNext} XP to Level {nextLevel}
            </span>
          )}
        </div>
        {showDetails && <span className="text-sm font-medium text-green-600">{points.toLocaleString()} XP</span>}
      </div>
      <Progress value={progress} className="h-2" />
      {showDetails && (
        <div className="flex justify-between text-xs text-gray-500">
          <span>Level {currentLevel}</span>
          <span>Level {nextLevel}</span>
        </div>
      )}
    </div>
  )
}
