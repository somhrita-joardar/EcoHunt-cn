// Hardcoded data for the demo application

export interface Mission {
  id: string
  title: string
  description: string
  points: number
  difficulty: "Easy" | "Medium" | "Hard"
  category: string
  targetValue: number
  timeLimitDays: number
  participantsCount: number
}

export interface UserMission {
  id: string
  missionId: string
  progress: number
  completed: boolean
  startedAt: string
  completedAt?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  pointsRequired: number
  earned: boolean
}

export interface EcoAction {
  id: string
  actionType: string
  description: string
  pointsEarned: number
  createdAt: string
}

export const MISSIONS: Mission[] = [
  {
    id: "mission-1",
    title: "Recycling Hero",
    description: "Recycle 15 items this week",
    points: 150,
    difficulty: "Easy",
    category: "Waste Reduction",
    targetValue: 15,
    timeLimitDays: 7,
    participantsCount: 1247,
  },
  {
    id: "mission-2",
    title: "Green Commuter",
    description: "Use public transport or bike for 7 days",
    points: 300,
    difficulty: "Medium",
    category: "Transportation",
    targetValue: 7,
    timeLimitDays: 7,
    participantsCount: 892,
  },
  {
    id: "mission-3",
    title: "Energy Saver",
    description: "Reduce electricity usage by 20% this month",
    points: 500,
    difficulty: "Hard",
    category: "Energy",
    targetValue: 20,
    timeLimitDays: 30,
    participantsCount: 634,
  },
  {
    id: "mission-4",
    title: "Tree Planter",
    description: "Plant 3 trees or support tree planting",
    points: 400,
    difficulty: "Medium",
    category: "Nature",
    targetValue: 3,
    timeLimitDays: 14,
    participantsCount: 456,
  },
  {
    id: "mission-5",
    title: "Water Guardian",
    description: "Save 100 liters of water this week",
    points: 250,
    difficulty: "Easy",
    category: "Water Conservation",
    targetValue: 100,
    timeLimitDays: 7,
    participantsCount: 789,
  },
  {
    id: "mission-6",
    title: "Eco Educator",
    description: "Share 5 eco-tips with friends or family",
    points: 200,
    difficulty: "Easy",
    category: "Education",
    targetValue: 5,
    timeLimitDays: 10,
    participantsCount: 567,
  },
]

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "achievement-1",
    name: "Getting Started",
    description: "Welcome to EcoHunt! Complete your first action.",
    icon: "🌱",
    pointsRequired: 10,
    earned: true,
  },
  {
    id: "achievement-2",
    name: "First Steps",
    description: "Earn your first 100 points",
    icon: "🏆",
    pointsRequired: 100,
    earned: true,
  },
  {
    id: "achievement-3",
    name: "Eco Warrior",
    description: "Reach 500 points",
    icon: "⚔️",
    pointsRequired: 500,
    earned: true,
  },
  {
    id: "achievement-4",
    name: "Green Champion",
    description: "Accumulate 1000 points",
    icon: "👑",
    pointsRequired: 1000,
    earned: true,
  },
  {
    id: "achievement-5",
    name: "Recycling Master",
    description: "Complete 5 recycling missions",
    icon: "♻️",
    pointsRequired: 750,
    earned: false,
  },
  {
    id: "achievement-6",
    name: "Transport Hero",
    description: "Complete 3 transportation missions",
    icon: "🚲",
    pointsRequired: 600,
    earned: false,
  },
]

// Fetch leaderboard from backend
export const fetchLeaderboard = async () => {
  try {
    const response = await fetch("http://localhost:5000/allusers")
    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    const users = await response.json()

    // Sort by points and add rank
    const sortedUsers = users
      .sort((a: any, b: any) => (b.points || 0) - (a.points || 0))
      .map((user: any, index: number) => ({
        id: user.id,
        name: user.name,
        points: user.points || 0,
        level: user.level || 1,
        rank: index + 1,
      }))

    return sortedUsers
  } catch (error) {
    console.error("Error fetching leaderboard:", error)
    // Return fallback data if backend is not available
    return [
      { id: "user-1", name: "Alice Green", points: 1247, level: 5, rank: 1 },
      { id: "user-2", name: "Bob Earth", points: 892, level: 4, rank: 2 },
      { id: "user-3", name: "Carol Nature", points: 634, level: 3, rank: 3 },
    ]
  }
}

export const LEADERBOARD = [
  { id: "user-3", name: "Carol Nature", points: 1456, level: 6, rank: 1 },
  { id: "user-1", name: "Alice Green", points: 1247, level: 5, rank: 2 },
  { id: "user-2", name: "Bob Earth", points: 892, level: 4, rank: 3 },
  { id: "user-4", name: "David Eco", points: 634, level: 3, rank: 4 },
  { id: "user-5", name: "Emma Forest", points: 567, level: 3, rank: 5 },
  { id: "user-6", name: "Frank Ocean", points: 445, level: 2, rank: 6 },
  { id: "user-7", name: "Grace Wind", points: 389, level: 2, rank: 7 },
  { id: "user-8", name: "Henry Solar", points: 312, level: 2, rank: 8 },
  { id: "user-9", name: "Ivy Green", points: 278, level: 1, rank: 9 },
  { id: "user-10", name: "Jack Leaf", points: 234, level: 1, rank: 10 },
]

// Local storage helpers
export function getUserMissions(userId: string): UserMission[] {
  const stored = localStorage.getItem(`user-missions-${userId}`)
  return stored ? JSON.parse(stored) : []
}

export function saveUserMissions(userId: string, missions: UserMission[]) {
  localStorage.setItem(`user-missions-${userId}`, JSON.stringify(missions))
}

export function getUserEcoActions(userId: string): EcoAction[] {
  const stored = localStorage.getItem(`user-actions-${userId}`)
  return stored ? JSON.parse(stored) : []
}

export function saveUserEcoActions(userId: string, actions: EcoAction[]) {
  localStorage.setItem(`user-actions-${userId}`, JSON.stringify(actions))
}

export function startMission(userId: string, missionId: string): boolean {
  const userMissions = getUserMissions(userId)

  // Check if mission already started
  if (userMissions.find((m) => m.missionId === missionId)) {
    return false
  }

  const newMission: UserMission = {
    id: `user-mission-${Date.now()}`,
    missionId,
    progress: 0,
    completed: false,
    startedAt: new Date().toISOString(),
  }

  userMissions.push(newMission)
  saveUserMissions(userId, userMissions)
  return true
}

export function updateMissionProgress(userId: string, missionId: string, progress: number): boolean {
  const userMissions = getUserMissions(userId)
  const mission = userMissions.find((m) => m.missionId === missionId)

  if (!mission) return false

  const missionData = MISSIONS.find((m) => m.id === missionId)
  if (!missionData) return false

  mission.progress = progress

  if (progress >= missionData.targetValue && !mission.completed) {
    mission.completed = true
    mission.completedAt = new Date().toISOString()
  }

  saveUserMissions(userId, userMissions)
  return true
}

export function logEcoAction(userId: string, actionType: string, description: string, pointsEarned: number): boolean {
  const actions = getUserEcoActions(userId)

  const newAction: EcoAction = {
    id: `action-${Date.now()}`,
    actionType,
    description,
    pointsEarned,
    createdAt: new Date().toISOString(),
  }

  actions.push(newAction)
  saveUserEcoActions(userId, actions)
  return true
}
