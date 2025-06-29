"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BADGES, type Badge as BadgeType } from "@/lib/gamification"

interface UserAchievement {
  id: string
  achievement: {
    name: string
    description: string
    points_required: number
  }
}

interface BadgeShowcaseProps {
  userId: string
  userPoints: number
  userMissions: number
  userStreak: number
  compact?: boolean
}

export function BadgeShowcase({ userId, userPoints, userMissions, userStreak, compact = false }: BadgeShowcaseProps) {
  const [userAchievements, setUserAchievements] = useState<UserAchievement[]>([])
  const [showAll, setShowAll] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadAchievements()
  }, [userId])

  const loadAchievements = async () => {
    try {
      const mockAchievements: UserAchievement[] = [
        {
          id: "1",
          achievement: {
            name: "Getting Started",
            description: "Welcome to EcoHunt!",
            points_required: 10,
          },
        },
        {
          id: "2",
          achievement: {
            name: "First Steps",
            description: "Earn your first 100 points",
            points_required: 100,
          },
        },
        {
          id: "3",
          achievement: {
            name: "Eco Warrior",
            description: "Reach 500 points",
            points_required: 500,
          },
        },
      ]
      setUserAchievements(mockAchievements)
    } catch (error) {
      console.error("Error loading achievements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const earnedBadgeIds = userAchievements.map((ua) => ua.achievement?.name.toLowerCase().replace(/\s+/g, "_"))

  const getEligibleBadges = () => {
    return BADGES.filter((badge) => {
      if (badge.points_required && userPoints >= badge.points_required) return true
      if (badge.missions_required && userMissions >= badge.missions_required) return true
      if (badge.streak_required && userStreak >= badge.streak_required) return true
      return false
    })
  }

  const eligibleBadges = getEligibleBadges()
  const earnedBadges = eligibleBadges.filter((badge) => earnedBadgeIds.includes(badge.id))
  const availableBadges = eligibleBadges.filter((badge) => !earnedBadgeIds.includes(badge.id))

  const getRarityColor = (rarity: BadgeType["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50"
      case "rare":
        return "border-blue-300 bg-blue-50"
      case "epic":
        return "border-purple-300 bg-purple-50"
      case "legendary":
        return "border-yellow-300 bg-yellow-50"
      default:
        return "border-gray-300 bg-gray-50"
    }
  }

  const displayBadges = compact
    ? [...earnedBadges.slice(0, 3), ...availableBadges.slice(0, 2)]
    : showAll
      ? [...earnedBadges, ...availableBadges]
      : [...earnedBadges.slice(0, 6), ...availableBadges.slice(0, 3)]

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <span>Badges</span>
            <Badge variant="secondary">
              {earnedBadges.length}/{BADGES.length}
            </Badge>
          </CardTitle>
          {!compact && (
            <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "Show All"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className={`grid ${compact ? "grid-cols-5" : "grid-cols-3 md:grid-cols-4 lg:grid-cols-6"} gap-3`}>
          {displayBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id)

            return (
              <div
                key={badge.id}
                className={`
                  relative p-3 rounded-lg border-2 text-center transition-all hover:scale-105
                  ${getRarityColor(badge.rarity)}
                  ${isEarned ? "opacity-100" : "opacity-60 grayscale"}
                `}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium truncate">{badge.name}</div>
                {!compact && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{badge.description}</div>}
                {isEarned && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <Badge
                  variant="outline"
                  className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs ${
                    badge.rarity === "legendary"
                      ? "bg-yellow-100 text-yellow-800"
                      : badge.rarity === "epic"
                        ? "bg-purple-100 text-purple-800"
                        : badge.rarity === "rare"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {badge.rarity}
                </Badge>
              </div>
            )
          })}
        </div>

        {!compact && availableBadges.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Next Badges to Earn:</h4>
            <div className="space-y-1">
              {availableBadges.slice(0, 3).map((badge) => (
                <div key={badge.id} className="text-sm text-blue-700">
                  <span className="font-medium">{badge.name}:</span> {badge.description}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
