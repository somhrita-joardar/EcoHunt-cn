"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { createAchievementNotification, type AchievementNotification } from "@/lib/gamification"

interface AchievementToastProps {
  notification: AchievementNotification
  onClose: () => void
}

export function AchievementToast({ notification, onClose }: AchievementToastProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animate in
    setTimeout(() => setIsVisible(true), 100)

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`
      fixed top-4 right-4 z-50 transition-all duration-300 transform
      ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
    `}
    >
      <Card className="w-80 border-2 border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl animate-bounce">{notification.icon}</div>
              <div>
                <h4 className="font-bold text-green-800">{notification.title}</h4>
                <p className="text-sm text-green-700">{notification.description}</p>
                {notification.points && (
                  <div className="mt-1">
                    <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      +{notification.points} points
                    </span>
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false)
                setTimeout(onClose, 300)
              }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Achievement Toast Manager
interface AchievementToastManagerProps {
  children: React.ReactNode
}

export function AchievementToastManager({ children }: AchievementToastManagerProps) {
  const [notifications, setNotifications] = useState<AchievementNotification[]>([])

  // Global function to show achievements
  useEffect(() => {
    ;(window as any).showAchievement = (type: string, data: any) => {
      const notification = createAchievementNotification(type as any, data)
      setNotifications((prev) => [...prev, notification])
    }

    return () => {
      delete (window as any).showAchievement
    }
  }, [])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <>
      {children}
      {notifications.map((notification) => (
        <AchievementToast
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </>
  )
}
