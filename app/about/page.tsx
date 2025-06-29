import { Navbar } from "@/components/navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Target, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About EcoHunt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            EcoHunt is a revolutionary platform that transforms environmental consciousness into an engaging, gamified
            experience. We believe that saving the planet should be fun, rewarding, and social.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              To make sustainable living accessible, enjoyable, and rewarding for everyone while creating a global
              community of environmental champions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Environmental Impact</h3>
                <p className="text-gray-600 text-sm">Every action counts towards a healthier planet</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Goal Achievement</h3>
                <p className="text-gray-600 text-sm">Set and achieve meaningful sustainability goals</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Community Building</h3>
                <p className="text-gray-600 text-sm">Connect with like-minded environmental enthusiasts</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Recognition</h3>
                <p className="text-gray-600 text-sm">Earn rewards and recognition for your efforts</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-600 mb-4 leading-relaxed">
              EcoHunt was born from a simple observation: people want to help the environment, but often don't know
              where to start or how to stay motivated. Traditional environmental initiatives can feel overwhelming or
              disconnected from daily life.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our founders, a team of environmental scientists and game designers, realized that the principles that
              make games engaging could be applied to environmental action. By introducing elements like points, badges,
              leaderboards, and social challenges, we could make sustainable living not just meaningful, but genuinely
              fun.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, EcoHunt serves thousands of users worldwide, helping them track their environmental impact, connect
              with others, and make a real difference in the fight against climate change. Every small action adds up to
              create significant positive change.
            </p>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Our Impact So Far</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50K+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">2M+</div>
              <div className="text-gray-600">Eco Actions Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">15K</div>
              <div className="text-gray-600">Trees Planted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500T</div>
              <div className="text-gray-600">CO₂ Saved</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
