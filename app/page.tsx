import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Users, Trophy } from "lucide-react"
import { Navbar } from "@/components/navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <Image src="/ecohunt-logo.png" alt="EcoHunt Logo" width={200} height={200} className="mx-auto mb-8" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Gamify Your Green Habits</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Join EcoHunt and turn sustainable living into an exciting adventure. Earn points, badges, and compete with
            friends as you make a positive impact on the planet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 px-8">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="px-8 bg-transparent">
              <Link href="/missions">Explore Missions</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How EcoHunt Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How EcoHunt Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Leaf className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Track Your Actions</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Log your eco-friendly activities, from recycling to reducing energy consumption, and see your impact
                  grow.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Connect with Friends</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Join a community of like-minded individuals, share tips, and challenge each other to achieve
                  sustainability goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Trophy className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Earn Rewards</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  Earn points and badges for your green efforts, climb the leaderboard, and unlock exciting rewards.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
