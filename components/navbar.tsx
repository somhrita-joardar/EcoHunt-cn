"use client"

import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut, Settings, Trophy } from "lucide-react"
import { LevelProgress } from "@/components/gamification/level-progress"
import { LeaderboardTier } from "@/components/gamification/leaderboard-tier"

export function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-600">
          EcoHunt
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
            About
          </Link>
          <Link href="/features" className="text-gray-600 hover:text-green-600 transition-colors">
            Features
          </Link>
          <Link href="/community" className="text-gray-600 hover:text-green-600 transition-colors">
            Community
          </Link>
          {user && (
            <Link href="/missions" className="text-gray-600 hover:text-green-600 transition-colors">
              Missions
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {user.points} pts
                    </span>
                    <LeaderboardTier rank={user.rank} showIcon={false} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="p-3 border-b">
                  <LevelProgress points={user.points} />
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <Trophy className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="flex items-center text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
