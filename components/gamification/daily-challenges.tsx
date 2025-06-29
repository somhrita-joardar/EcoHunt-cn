"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { generateDailyChallenge, type Challenge } from "@/lib/gamification"
import { Calendar, Target, Trophy } from "lucide-react"

interface DailyChallengesProps {
  userId: string
  onChallengeComplete?: () => void
}

export function DailyChallenges({ userId, onChallengeComplete }: DailyChallengesProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [challengeProgress, setChallengeProgress] = useState<Record<string, number>>({})
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())

  useEffect(() => {
    generateTodaysChallenges()
    loadChallengeProgress()
  }, [])

  const generateTodaysChallenges = () => {
    // Generate 3 daily challenges
    const todaysChallenges = [generateDailyChallenge(), generateDailyChallenge(), generateDailyChallenge()]
    setChallenges(todaysChallenges)
  }

  const loadChallengeProgress = () => {
    // Load from localStorage for demo (in real app, load from database)
    const saved = localStorage.getItem(`challenges_${userId}_${new Date().toDateString()}`)
    if (saved) {
      const data = JSON.parse(saved)
      setChallengeProgress(data.progress || {})
      setCompletedChallenges(new Set(data.completed || []))
    }
  }

  const saveChallengeProgress = (progress: Record<string, number>, completed: Set<string>) => {
    localStorage.setItem(
      `challenges_${userId}_${new Date().toDateString()}`,
      JSON.stringify({
        progress,
        completed: Array.from(completed),
      }),
    )
  }

  const handleChallengeAction = async (challengeId: string, challenge: Challenge) => {
    if (completedChallenges.has(challengeId)) return

    const currentProgress = challengeProgress[challengeId] || 0
    const newProgress = Math.min(currentProgress + 1, challenge.target)

    const updatedProgress = { ...challengeProgress, [challengeId]: newProgress }
    setChallengeProgress(updatedProgress)

    // Check if challenge is completed
    if (newProgress >= challenge.target) {
      const updatedCompleted = new Set(completedChallenges).add(challengeId)
      setCompletedChallenges(updatedCompleted)

      // Save completion to local storage (instead of database)
      const completedActions = JSON.parse(localStorage.getItem(`user-actions-${userId}`) || "[]")
      completedActions.push({
        id: `challenge-${Date.now()}`,
        actionType: `daily_challenge_${challenge.category}`,
        description: `Completed daily challenge: ${challenge.title}`,
        pointsEarned: challenge.reward_points,
        createdAt: new Date().toISOString(),
      })
      localStorage.setItem(`user-actions-${userId}`, JSON.stringify(completedActions))

      saveChallengeProgress(updatedProgress, updatedCompleted)
      onChallengeComplete?.()
    } else {
      saveChallengeProgress(updatedProgress, completedChallenges)
    }
  }

  const getChallengeIcon = (category?: string) => {
    switch (category) {
      case "recycling":
        return "♻️"
      case "transport":
        return "🚲"
      case "energy":
        return "💡"
      case "water":
        return "💧"
      case "education":
        return "📚"
      default:
        return "🎯"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Daily Challenges</span>
          <Badge variant="secondary">
            {Array.from(completedChallenges).length}/{challenges.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {challenges.map((challenge) => {
          const progress = challengeProgress[challenge.id] || 0
          const isCompleted = completedChallenges.has(challenge.id)
          const progressPercentage = (progress / challenge.target) * 100

          return (
            <div
              key={challenge.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCompleted ? "border-green-300 bg-green-50" : "border-gray-200 bg-white hover:border-green-200"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getChallengeIcon(challenge.category)}</div>
                  <div>
                    <h4 className="font-medium">{challenge.title}</h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-600">
                    <Trophy className="w-3 h-3 mr-1" />
                    {challenge.reward_points}
                  </Badge>
                  {isCompleted && <Badge className="bg-green-500">✅ Complete</Badge>}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Progress: {progress}/{challenge.target}
                  </span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>

              {!isCompleted && (
                <Button
                  size="sm"
                  className="mt-3 w-full bg-green-600 hover:bg-green-700"
                  onClick={() => handleChallengeAction(challenge.id, challenge)}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Log Action ({progress}/{challenge.target})
                </Button>
              )}
            </div>
          )
        })}

        <div className="text-center text-sm text-gray-500 mt-4">Challenges reset daily at midnight</div>
      </CardContent>
    </Card>
  )
}
