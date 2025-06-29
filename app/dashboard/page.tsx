"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Trophy, Users, Target, Calendar, Award } from "lucide-react"
import { useState, useEffect } from "react"
import {
  MISSIONS,
  ACHIEVEMENTS,
  getUserMissions,
  updateMissionProgress,
  logEcoAction,
  type UserMission,
} from "@/lib/data"

import { LevelProgress } from "@/components/gamification/level-progress"
import { StreakCounter } from "@/components/gamification/streak-counter"
import { BadgeShowcase } from "@/components/gamification/badge-showcase"
import { DailyChallenges } from "@/components/gamification/daily-challenges"
import { PointMultiplier } from "@/components/gamification/point-multiplier"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

function DashboardContent() {
  const { user, updateUserStats } = useAuth()
  const [userMissions, setUserMissions] = useState<UserMission[]>([])
  const [streak] = useState(7) // Hardcoded streak for demo

  useEffect(() => {
    if (user) {
      loadDashboardData()
    }
  }, [user])

  const loadDashboardData = () => {
    if (!user) return

    const missions = getUserMissions(user.id)
    setUserMissions(missions.filter((m) => !m.completed).slice(0, 3))
  }

  const handleQuickAction = (actionType: string, description: string, points: number) => {
    if (!user) return

    logEcoAction(user.id, actionType, description, points)
    updateUserStats({
      points: user.points + points,
      ecoActions: user.ecoActions + 1,
    })
  }

  const handleLogProgress = (missionId: string, currentProgress: number) => {
    if (!user) return

    const newProgress = currentProgress + 1
    updateMissionProgress(user.id, missionId, newProgress)

    const mission = MISSIONS.find((m) => m.id === missionId)
    if (mission && newProgress >= mission.targetValue) {
      updateUserStats({
        points: user.points + mission.points,
        missionsCompleted: user.missionsCompleted + 1,
      })
    }

    loadDashboardData()
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Continue your journey to make the planet greener</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Points</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold text-green-600">{user.points.toLocaleString()}</p>
                    <PointMultiplier streak={streak} level={user.level} showDetails={false} />
                  </div>
                </div>
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
              <div className="mt-3">
                <LevelProgress points={user.points} showDetails={false} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Missions Completed</p>
                  <p className="text-2xl font-bold text-green-600">{user.missionsCompleted}</p>
                </div>
                <Target className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Eco Actions</p>
                  <p className="text-2xl font-bold text-green-600">{user.ecoActions}</p>
                </div>
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Global Rank</p>
                  <p className="text-2xl font-bold text-green-600">#{user.rank}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gamification Section */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <StreakCounter userId={user.id} />
          <DailyChallenges
            userId={user.id}
            onChallengeComplete={() => {
              updateUserStats({ points: user.points + 50 })
            }}
          />
          <BadgeShowcase
            userId={user.id}
            userPoints={user.points}
            userMissions={user.missionsCompleted}
            userStreak={streak}
            compact={true}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Active Missions</CardTitle>
              <CardDescription>Complete these missions to earn more points</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userMissions.length > 0 ? (
                userMissions.map((userMission) => {
                  const mission = MISSIONS.find((m) => m.id === userMission.missionId)
                  if (!mission) return null

                  const progressPercentage = (userMission.progress / mission.targetValue) * 100

                  return (
                    <div key={userMission.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{mission.title}</span>
                        <Badge variant="secondary">
                          {userMission.progress}/{mission.targetValue}
                        </Badge>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          {mission.targetValue - userMission.progress} remaining
                        </span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleLogProgress(mission.id, userMission.progress)}
                        >
                          Log Progress
                        </Button>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No active missions.{" "}
                  <a href="/missions" className="text-green-600 hover:underline">
                    Start a mission
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest eco-friendly accomplishments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {ACHIEVEMENTS.filter((a) => a.earned)
                .slice(0, 3)
                .map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{achievement.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{achievement.name}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    <Badge className="bg-green-600">+{achievement.pointsRequired} pts</Badge>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Log your eco-friendly activities quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button
                className="h-20 flex-col bg-green-600 hover:bg-green-700"
                onClick={() => handleQuickAction("recycling", "Recycled items", 10)}
              >
                <Award className="w-6 h-6 mb-2" />
                Log Recycling
              </Button>
              <Button
                className="h-20 flex-col bg-green-600 hover:bg-green-700"
                onClick={() => handleQuickAction("transport", "Used public transport", 15)}
              >
                <Calendar className="w-6 h-6 mb-2" />
                Public Transport
              </Button>
              <Button
                className="h-20 flex-col bg-green-600 hover:bg-green-700"
                onClick={() => handleQuickAction("nature", "Planted a tree", 50)}
              >
                <Leaf className="w-6 h-6 mb-2" />
                Plant Tree
              </Button>
              <Button
                className="h-20 flex-col bg-green-600 hover:bg-green-700"
                onClick={() => handleQuickAction("education", "Shared eco tip", 5)}
              >
                <Trophy className="w-6 h-6 mb-2" />
                Share Tip
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
