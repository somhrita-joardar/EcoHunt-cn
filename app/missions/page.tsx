"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { Navbar } from "@/components/navbar"
import { useAuth } from "@/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Leaf, Recycle, Car, Lightbulb, TreePine, Droplets } from "lucide-react"
import { useState, useEffect } from "react"
import { MISSIONS, getUserMissions, startMission, type UserMission } from "@/lib/data"

const iconMap = {
  "Waste Reduction": Recycle,
  Transportation: Car,
  Energy: Lightbulb,
  Nature: TreePine,
  "Water Conservation": Droplets,
  Education: Leaf,
}

export default function MissionsPage() {
  return (
    <ProtectedRoute>
      <MissionsContent />
    </ProtectedRoute>
  )
}

function MissionsContent() {
  const { user } = useAuth()
  const [userMissions, setUserMissions] = useState<UserMission[]>([])

  useEffect(() => {
    if (user) {
      setUserMissions(getUserMissions(user.id))
    }
  }, [user])

  const handleStartMission = (missionId: string) => {
    if (!user) return

    const success = startMission(user.id, missionId)
    if (success) {
      setUserMissions(getUserMissions(user.id))
    } else {
      alert("Mission already started!")
    }
  }

  const isMissionStarted = (missionId: string) => {
    return userMissions.some((um) => um.missionId === missionId)
  }

  const getMissionStatus = (missionId: string) => {
    const userMission = userMissions.find((um) => um.missionId === missionId)
    if (!userMission) return null

    if (userMission.completed) return "completed"
    return "active"
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Missions</h1>
          <p className="text-gray-600">Choose missions to complete and earn points for your eco-friendly actions</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MISSIONS.map((mission) => {
            const IconComponent = iconMap[mission.category as keyof typeof iconMap] || Leaf
            const status = getMissionStatus(mission.id)
            const isStarted = isMissionStarted(mission.id)

            return (
              <Card key={mission.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <IconComponent className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{mission.title}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {mission.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge
                        variant={
                          mission.difficulty === "Easy"
                            ? "secondary"
                            : mission.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {mission.difficulty}
                      </Badge>
                      {status && (
                        <Badge
                          variant={status === "completed" ? "default" : "outline"}
                          className={status === "completed" ? "bg-green-600" : ""}
                        >
                          {status === "completed" ? "Completed" : "Active"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{mission.description}</CardDescription>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Time Limit:</span>
                      <span className="font-medium">{mission.timeLimitDays} days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Participants:</span>
                      <span className="font-medium">{mission.participantsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Target:</span>
                      <span className="font-medium">{mission.targetValue}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">{mission.points}</span>
                      <span className="text-sm text-gray-600">points</span>
                    </div>
                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleStartMission(mission.id)}
                      disabled={isStarted}
                    >
                      {status === "completed" ? "Completed" : status === "active" ? "In Progress" : "Start Mission"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Mission Categories */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Mission Categories</CardTitle>
            <CardDescription>Explore different types of environmental challenges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Waste Reduction</h3>
                <p className="text-sm text-gray-600">Focus on reducing, reusing, and recycling waste materials</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Energy Conservation</h3>
                <p className="text-sm text-gray-600">Reduce energy consumption and promote renewable sources</p>
              </div>
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Nature Protection</h3>
                <p className="text-sm text-gray-600">Protect and restore natural habitats and biodiversity</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
