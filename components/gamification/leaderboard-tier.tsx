"use client"

import { Badge } from "@/components/ui/badge"
import { getLeaderboardTier } from "@/lib/gamification"

interface LeaderboardTierProps {
  rank: number
  showIcon?: boolean
}

export function LeaderboardTier({ rank, showIcon = true }: LeaderboardTierProps) {
  const tier = getLeaderboardTier(rank)

  return (
    <Badge variant="outline" className={`${tier.color} border-current`}>
      {showIcon && <span className="mr-1">{tier.icon}</span>}
      {tier.name}
    </Badge>
  )
}
