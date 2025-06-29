"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Trophy, MessageCircle, Calendar, MapPin, Leaf } from "lucide-react"
import { fetchLeaderboard } from "@/lib/data"
import { LeaderboardTier } from "@/components/gamification/leaderboard-tier"

const groups = [
  {
    name: "Urban Gardeners",
    members: 1247,
    description: "Growing green spaces in the city",
    category: "Gardening",
    image: "🌱",
  },
  {
    name: "Zero Waste Warriors",
    members: 892,
    description: "Reducing waste to absolute minimum",
    category: "Waste Reduction",
    image: "♻️",
  },
  {
    name: "Clean Energy Champions",
    members: 634,
    description: "Promoting renewable energy solutions",
    category: "Energy",
    image: "⚡",
  },
  {
    name: "Eco Commuters",
    members: 456,
    description: "Sustainable transportation advocates",
    category: "Transportation",
    image: "🚲",
  },
]

const events = [
  {
    title: "Community Tree Planting",
    date: "Dec 15, 2024",
    location: "Central Park",
    participants: 45,
    type: "Local Event",
  },
  {
    title: "Beach Cleanup Challenge",
    date: "Dec 20, 2024",
    location: "Santa Monica Beach",
    participants: 78,
    type: "Challenge",
  },
  {
    title: "Sustainable Living Workshop",
    date: "Dec 22, 2024",
    location: "Online",
    participants: 156,
    type: "Workshop",
  },
]

export default function CommunityPage() {
  const [leaderboard, setLeaderboard] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  const loadLeaderboard = async () => {
    try {
      const data = await fetchLeaderboard()
      setLeaderboard(data)
    } catch (error) {
      console.error("Failed to load leaderboard:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Join Our Community</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of eco-warriors worldwide. Share experiences, learn from others, and make a bigger
            impact together.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center">
            <CardContent className="p-6">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{leaderboard.length}</div>
              <div className="text-sm text-gray-600">Active Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">2,156</div>
              <div className="text-sm text-gray-600">Missions Completed</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">234</div>
              <div className="text-sm text-gray-600">Events This Month</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Leaf className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">15,678</div>
              <div className="text-sm text-gray-600">Eco Actions</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-green-600" />
                  Top Eco-Warriors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="animate-pulse flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  leaderboard.slice(0, 10).map((user, index) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-sm font-bold text-gray-500 w-6">#{index + 1}</div>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {user.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-sm">{user.name}</div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">Level {user.level}</span>
                            <LeaderboardTier rank={index + 1} />
                          </div>
                        </div>
                      </div>
                      <div className="text-sm font-bold text-green-600">{user.points.toLocaleString()}</div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Groups */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-green-600" />
                    Popular Groups
                  </span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {groups.map((group, index) => (
                    <Card key={index} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-2xl">{group.image}</div>
                            <div>
                              <h3 className="font-semibold text-sm">{group.name}</h3>
                              <p className="text-xs text-gray-600">{group.members.toLocaleString()} members</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {group.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                        <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                          Join Group
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-600" />
                    Upcoming Events
                  </span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {events.map((event, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{event.title}</h3>
                      <Badge variant="outline">{event.type}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {event.date}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {event.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {event.participants} joined
                      </span>
                    </div>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Join Event
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
