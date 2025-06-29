import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Trophy,
  Users,
  BarChart3,
  Target,
  Leaf,
  Calendar,
  Share2,
  Bell,
  MapPin,
  Camera,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description: "Access EcoHunt anywhere with our responsive design optimized for all devices.",
    category: "Platform",
  },
  {
    icon: Trophy,
    title: "Gamification System",
    description: "Earn points, unlock badges, and climb leaderboards as you complete eco-friendly actions.",
    category: "Engagement",
  },
  {
    icon: Users,
    title: "Social Community",
    description: "Connect with friends, join groups, and participate in community challenges.",
    category: "Social",
  },
  {
    icon: BarChart3,
    title: "Impact Analytics",
    description: "Track your environmental impact with detailed analytics and progress reports.",
    category: "Analytics",
  },
  {
    icon: Target,
    title: "Mission System",
    description: "Complete diverse missions ranging from recycling to energy conservation.",
    category: "Missions",
  },
  {
    icon: Leaf,
    title: "Carbon Footprint Tracking",
    description: "Monitor and reduce your carbon footprint with our comprehensive tracking tools.",
    category: "Environment",
  },
  {
    icon: Calendar,
    title: "Habit Building",
    description: "Build lasting eco-friendly habits with daily challenges and streak tracking.",
    category: "Habits",
  },
  {
    icon: Share2,
    title: "Social Sharing",
    description: "Share your achievements and inspire others to join the environmental movement.",
    category: "Social",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Get reminded about your missions and celebrate your achievements.",
    category: "Engagement",
  },
  {
    icon: MapPin,
    title: "Local Events",
    description: "Discover and participate in environmental events in your area.",
    category: "Community",
  },
  {
    icon: Camera,
    title: "Photo Verification",
    description: "Document your eco-actions with photos to verify and share your impact.",
    category: "Verification",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description: "Get instant updates on your progress and community activities.",
    category: "Platform",
  },
]

const categories = [
  "All",
  "Platform",
  "Engagement",
  "Social",
  "Analytics",
  "Missions",
  "Environment",
  "Habits",
  "Community",
  "Verification",
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Navbar />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Powerful Features</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover all the tools and features that make EcoHunt the ultimate platform for environmental action and
            community engagement.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Badge key={category} variant="outline" className="px-4 py-2 cursor-pointer hover:bg-green-50">
              {category}
            </Badge>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-green-600" />
                    </div>
                    <Badge variant="secondary">{feature.category}</Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="bg-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Coming Soon</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Mobile App</h3>
              <p className="text-gray-600 text-sm">Native iOS and Android apps for the ultimate mobile experience</p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AR Challenges</h3>
              <p className="text-gray-600 text-sm">
                Augmented reality missions for interactive environmental education
              </p>
            </div>
            <div className="p-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Corporate Program</h3>
              <p className="text-gray-600 text-sm">Team challenges and sustainability programs for businesses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
