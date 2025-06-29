// XP and Level System
export const calculateLevel = (points: number): number => {
  // Level formula: Level = floor(sqrt(points / 100)) + 1
  return Math.floor(Math.sqrt(points / 100)) + 1
}

export const getPointsForNextLevel = (currentLevel: number): number => {
  // Points needed for next level: (level^2) * 100
  return currentLevel * currentLevel * 100
}

export const getXPProgress = (
  points: number,
): { currentLevel: number; nextLevel: number; progress: number; pointsToNext: number } => {
  const currentLevel = calculateLevel(points)
  const nextLevel = currentLevel + 1
  const pointsForCurrentLevel = (currentLevel - 1) * (currentLevel - 1) * 100
  const pointsForNextLevel = getPointsForNextLevel(currentLevel)
  const pointsInCurrentLevel = points - pointsForCurrentLevel
  const pointsNeededForLevel = pointsForNextLevel - pointsForCurrentLevel
  const progress = (pointsInCurrentLevel / pointsNeededForLevel) * 100

  return {
    currentLevel,
    nextLevel,
    progress: Math.min(progress, 100),
    pointsToNext: pointsForNextLevel - points,
  }
}

// Streak System
export const calculateStreak = async (userId: string): Promise<number> => {
  // Hardcoded streak calculation for demo
  const streakData = localStorage.getItem(`user-streak-${userId}`)
  if (streakData) {
    const { streak, lastDate } = JSON.parse(streakData)
    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()

    // If last action was today or yesterday, return current streak
    if (lastDate === today || lastDate === yesterday) {
      return streak
    }
  }

  // Default streak for demo users
  const demoStreaks: Record<string, number> = {
    "user-1": 7,
    "user-2": 3,
    "user-3": 15,
  }

  return demoStreaks[userId] || 0
}

// Badge System
export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: "common" | "rare" | "epic" | "legendary"
  condition: string
  points_required?: number
  missions_required?: number
  streak_required?: number
  special_condition?: string
}

export const BADGES: Badge[] = [
  // Starter Badges
  {
    id: "first_steps",
    name: "First Steps",
    description: "Complete your first eco action",
    icon: "👶",
    rarity: "common",
    condition: "eco_actions >= 1",
  },
  {
    id: "getting_started",
    name: "Getting Started",
    description: "Earn your first 50 points",
    icon: "🌱",
    rarity: "common",
    condition: "points >= 50",
  },

  // Point Milestones
  {
    id: "eco_novice",
    name: "Eco Novice",
    description: "Reach 100 points",
    icon: "🌿",
    rarity: "common",
    condition: "points >= 100",
    points_required: 100,
  },
  {
    id: "eco_warrior",
    name: "Eco Warrior",
    description: "Reach 500 points",
    icon: "⚔️",
    rarity: "rare",
    condition: "points >= 500",
    points_required: 500,
  },
  {
    id: "green_champion",
    name: "Green Champion",
    description: "Reach 1000 points",
    icon: "🏆",
    rarity: "rare",
    condition: "points >= 1000",
    points_required: 1000,
  },
  {
    id: "earth_guardian",
    name: "Earth Guardian",
    description: "Reach 2500 points",
    icon: "🛡️",
    rarity: "epic",
    condition: "points >= 2500",
    points_required: 2500,
  },
  {
    id: "planet_hero",
    name: "Planet Hero",
    description: "Reach 5000 points",
    icon: "🦸",
    rarity: "epic",
    condition: "points >= 5000",
    points_required: 5000,
  },
  {
    id: "eco_legend",
    name: "Eco Legend",
    description: "Reach 10000 points",
    icon: "👑",
    rarity: "legendary",
    condition: "points >= 10000",
    points_required: 10000,
  },

  // Mission Badges
  {
    id: "mission_starter",
    name: "Mission Starter",
    description: "Complete your first mission",
    icon: "🎯",
    rarity: "common",
    condition: "missions_completed >= 1",
    missions_required: 1,
  },
  {
    id: "mission_master",
    name: "Mission Master",
    description: "Complete 10 missions",
    icon: "🎖️",
    rarity: "rare",
    condition: "missions_completed >= 10",
    missions_required: 10,
  },
  {
    id: "mission_legend",
    name: "Mission Legend",
    description: "Complete 25 missions",
    icon: "🏅",
    rarity: "epic",
    condition: "missions_completed >= 25",
    missions_required: 25,
  },

  // Streak Badges
  {
    id: "consistent",
    name: "Consistent",
    description: "Maintain a 7-day streak",
    icon: "🔥",
    rarity: "rare",
    condition: "streak >= 7",
    streak_required: 7,
  },
  {
    id: "dedicated",
    name: "Dedicated",
    description: "Maintain a 30-day streak",
    icon: "💪",
    rarity: "epic",
    condition: "streak >= 30",
    streak_required: 30,
  },
  {
    id: "unstoppable",
    name: "Unstoppable",
    description: "Maintain a 100-day streak",
    icon: "⚡",
    rarity: "legendary",
    condition: "streak >= 100",
    streak_required: 100,
  },

  // Category Specific
  {
    id: "recycling_hero",
    name: "Recycling Hero",
    description: "Complete 5 recycling actions",
    icon: "♻️",
    rarity: "rare",
    condition: "recycling_actions >= 5",
  },
  {
    id: "transport_champion",
    name: "Transport Champion",
    description: "Complete 5 transport actions",
    icon: "🚲",
    rarity: "rare",
    condition: "transport_actions >= 5",
  },
  {
    id: "energy_saver",
    name: "Energy Saver",
    description: "Complete 5 energy actions",
    icon: "💡",
    rarity: "rare",
    condition: "energy_actions >= 5",
  },
  {
    id: "nature_lover",
    name: "Nature Lover",
    description: "Complete 5 nature actions",
    icon: "🌳",
    rarity: "rare",
    condition: "nature_actions >= 5",
  },

  // Special Badges
  {
    id: "early_bird",
    name: "Early Bird",
    description: "Log an action before 8 AM",
    icon: "🌅",
    rarity: "rare",
    condition: "early_morning_action",
    special_condition: "time < 08:00",
  },
  {
    id: "night_owl",
    name: "Night Owl",
    description: "Log an action after 10 PM",
    icon: "🦉",
    rarity: "rare",
    condition: "late_night_action",
    special_condition: "time > 22:00",
  },
  {
    id: "weekend_warrior",
    name: "Weekend Warrior",
    description: "Complete actions on both weekend days",
    icon: "🏖️",
    rarity: "rare",
    condition: "weekend_actions",
    special_condition: "weekend_both_days",
  },
]

// Challenge System
export interface Challenge {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "monthly" | "special"
  target: number
  reward_points: number
  reward_badge?: string
  start_date: string
  end_date: string
  category?: string
}

export const generateDailyChallenge = (): Challenge => {
  const challenges = [
    { title: "Recycle Master", description: "Recycle 3 items today", target: 3, points: 30, category: "recycling" },
    {
      title: "Green Commuter",
      description: "Use eco-friendly transport",
      target: 1,
      points: 25,
      category: "transport",
    },
    { title: "Energy Saver", description: "Turn off 5 unused devices", target: 5, points: 20, category: "energy" },
    { title: "Water Guardian", description: "Save water 3 times today", target: 3, points: 15, category: "water" },
    { title: "Eco Educator", description: "Share 1 eco-tip", target: 1, points: 10, category: "education" },
  ]

  const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  return {
    id: `daily_${today.getTime()}`,
    title: randomChallenge.title,
    description: randomChallenge.description,
    type: "daily",
    target: randomChallenge.target,
    reward_points: randomChallenge.points,
    start_date: today.toISOString(),
    end_date: tomorrow.toISOString(),
    category: randomChallenge.category,
  }
}

// Leaderboard Tiers
export const getLeaderboardTier = (rank: number): { name: string; color: string; icon: string } => {
  if (rank <= 10) return { name: "Diamond", color: "text-blue-600", icon: "💎" }
  if (rank <= 50) return { name: "Gold", color: "text-yellow-600", icon: "🥇" }
  if (rank <= 100) return { name: "Silver", color: "text-gray-600", icon: "🥈" }
  if (rank <= 500) return { name: "Bronze", color: "text-orange-600", icon: "🥉" }
  return { name: "Iron", color: "text-gray-400", icon: "⚪" }
}

// Point Multipliers
export const getPointMultiplier = (streak: number, level: number): number => {
  let multiplier = 1

  // Streak bonus
  if (streak >= 7) multiplier += 0.1
  if (streak >= 30) multiplier += 0.2
  if (streak >= 100) multiplier += 0.3

  // Level bonus
  if (level >= 5) multiplier += 0.05
  if (level >= 10) multiplier += 0.1
  if (level >= 20) multiplier += 0.15

  return Math.round(multiplier * 100) / 100
}

// Achievement Notifications
export interface AchievementNotification {
  id: string
  type: "badge" | "level_up" | "streak" | "challenge_complete"
  title: string
  description: string
  icon: string
  points?: number
  timestamp: string
}

export const createAchievementNotification = (
  type: AchievementNotification["type"],
  data: any,
): AchievementNotification => {
  const notifications = {
    badge: {
      title: `New Badge Earned!`,
      description: `You've earned the "${data.name}" badge!`,
      icon: data.icon || "🏆",
    },
    level_up: {
      title: `Level Up!`,
      description: `Congratulations! You've reached level ${data.level}!`,
      icon: "⬆️",
    },
    streak: {
      title: `Streak Milestone!`,
      description: `Amazing! You've maintained a ${data.streak}-day streak!`,
      icon: "🔥",
    },
    challenge_complete: {
      title: `Challenge Complete!`,
      description: `You've completed the "${data.title}" challenge!`,
      icon: "✅",
    },
  }

  const notification = notifications[type]

  return {
    id: `${type}_${Date.now()}`,
    type,
    title: notification.title,
    description: notification.description,
    icon: notification.icon,
    points: data.points,
    timestamp: new Date().toISOString(),
  }
}
