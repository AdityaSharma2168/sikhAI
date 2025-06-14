"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Calendar,
  Heart,
  Menu,
  MessageCircle,
  Play,
  Target,
  X,
  ArrowRight,
  Users,
  Star,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center group-hover:bg-gray-800 transition-colors duration-200">
                <span className="text-white font-bold text-lg">ੴ</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">SikhAI</h1>
                <p className="text-xs text-black">Spiritual Guide</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <Link
                href="/daily-paath"
                className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                Daily Paath
              </Link>
              <Link
                href="/shabad-discover"
                className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                Shabad Discover
              </Link>
              <Link
                href="/ai-guidance"
                className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                AI Guidance
              </Link>
              <Link
                href="/sangat-seva"
                className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                Sangat & Seva
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Link href="/onboarding">
                <Button className="bg-black text-white hover:bg-gray-800 font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:shadow-lg">
                  Begin Journey
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-black p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/daily-paath"
                  className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Daily Paath
                </Link>
                <Link
                  href="/shabad-discover"
                  className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shabad Discover
                </Link>
                <Link
                  href="/ai-guidance"
                  className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  AI Guidance
                </Link>
                <Link
                  href="/sangat-seva"
                  className="text-black hover:text-gray-800 transition-colors duration-200 font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sangat & Seva
                </Link>
                <Link href="/onboarding" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-black text-white hover:bg-gray-800 font-medium w-full rounded-lg">
                    Begin Journey
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo Circle */}
          <div className="mb-12">
            <div className="w-24 h-24 bg-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-white font-bold text-3xl">ੴ</span>
            </div>
            <p className="text-lg text-black">
              <span className="font-semibold text-black">ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ</span> • Welcome, Ji
            </p>
          </div>

          {/* Main Heading */}
          <div className="mb-12">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight text-black">
              Walk the Path of <br />
              <span className="text-black">Guru's Light</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-3xl mx-auto text-black">
              Let AI guide you through the timeless wisdom of our Gurus. From daily Nitnem to Shabad discovery,
              experience Sikhi with technology that respects tradition.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/daily-paath">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Start Daily Paath
              </Button>
            </Link>
            <Link href="/ai-guidance">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-black text-black hover:bg-black hover:text-white px-8 py-3 text-lg font-medium rounded-lg transition-all duration-200"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Ask AI Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: "Daily Active Users", value: "12.5K", icon: Users },
              { label: "Prayers Completed", value: "89.2K", icon: Target },
              { label: "AI Interactions", value: "156K", icon: MessageCircle },
            ].map((stat, index) => (
              <Card key={index} className="border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-3">
                    <stat.icon className="w-6 h-6 text-black mr-2" />
                  </div>
                  <div className="text-3xl font-bold text-black mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Daily Spiritual Journey Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Your Daily Spiritual Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Begin each day with Hukamnama, continue with Nitnem, and reflect through guided journaling
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Today's Hukamnama",
                description: "Divine guidance for your day",
                icon: BookOpen,
                href: "/hukamnama",
              },
              {
                title: "Daily Nitnem",
                description: "Your spiritual practice tracker",
                icon: Target,
                href: "/daily-paath",
              },
              {
                title: "Heart Reflection",
                description: "Write from the soul, no judgment",
                icon: Heart,
                href: "/reflection",
              },
            ].map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-gray-100 group-hover:bg-black rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                      <feature.icon className="w-8 h-8 text-black group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>
                    <div className="flex items-center justify-center text-black group-hover:text-gray-600 transition-colors duration-300">
                      <span className="font-medium">Explore</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-black mb-6 text-center">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Japji Sahib", href: "/japji-sahib", icon: Play },
                { name: "Rehras Sahib", href: "/rehras-sahib", icon: Play },
                { name: "Kirtan", href: "/shabad-discover", icon: Star },
                { name: "Gurdwara Finder", href: "/sangat-seva", icon: Users },
              ].map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button
                    variant="ghost"
                    className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-white hover:shadow-md transition-all duration-200 rounded-xl"
                  >
                    <action.icon className="w-6 h-6 text-black" />
                    <span className="text-sm font-medium text-black">{action.name}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ੴ</span>
              </div>
              <span className="text-xl font-bold text-black">SikhAI</span>
            </div>
            <p className="mb-4 text-black">
              Walking the path of Guru's light with respect, tradition, and technology
            </p>
            <p className="text-sm text-black">© 2025 SikhAI. Made with ❤️ for the Sangat</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
