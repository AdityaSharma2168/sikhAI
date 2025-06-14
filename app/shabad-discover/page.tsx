"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Search,
  Play,
  Pause,
  Heart,
  Bookmark,
  Music,
  Filter,
  Volume2,
  SkipForward,
  SkipBack,
} from "lucide-react"
import Link from "next/link"

interface Shabad {
  id: string
  title: string
  raag: string
  duration: string
  artist: string
  mood: string
  language: string
  isPlaying: boolean
  isLiked: boolean
  isBookmarked: boolean
}

export default function ShabadDiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMood, setSelectedMood] = useState<string | null>(null)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const moods = [
    { name: "Shanti", label: "Peace & Calm", color: "bg-blue-100 text-blue-800" },
    { name: "Birha", label: "Longing & Love", color: "bg-purple-100 text-purple-800" },
    { name: "Chardi Kala", label: "High Spirits", color: "bg-orange-100 text-orange-800" },
    { name: "Simran", label: "Meditation", color: "bg-green-100 text-green-800" },
    { name: "Bhakti", label: "Devotion", color: "bg-pink-100 text-pink-800" },
    { name: "Gyan", label: "Wisdom", color: "bg-indigo-100 text-indigo-800" },
  ]

  const [shabads, setShabads] = useState<Shabad[]>([
    {
      id: "1",
      title: "Dhan Dhan Ram Das Gur",
      raag: "Raag Gujri",
      duration: "4:32",
      artist: "Bhai Harjinder Singh",
      mood: "Bhakti",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: false,
      isBookmarked: true,
    },
    {
      id: "2",
      title: "Waheguru Simran",
      raag: "Raag Asa",
      duration: "6:15",
      artist: "Bhai Manpreet Singh",
      mood: "Simran",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: true,
      isBookmarked: false,
    },
    {
      id: "3",
      title: "Anand Sahib",
      raag: "Raag Ramkali",
      duration: "8:45",
      artist: "Bhai Davinder Singh",
      mood: "Chardi Kala",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "4",
      title: "Ik Onkar Satnaam",
      raag: "Raag Sorath",
      duration: "5:20",
      artist: "Bibi Jasbir Kaur",
      mood: "Gyan",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: true,
      isBookmarked: true,
    },
    {
      id: "5",
      title: "Mool Mantar",
      raag: "Raag Bilawal",
      duration: "3:45",
      artist: "Bhai Sarabjit Singh",
      mood: "Shanti",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: false,
      isBookmarked: false,
    },
    {
      id: "6",
      title: "Tere Bhane Sarbat Da Bhala",
      raag: "Raag Kalyan",
      duration: "7:12",
      artist: "Bhai Onkar Singh",
      mood: "Birha",
      language: "Gurmukhi",
      isPlaying: false,
      isLiked: false,
      isBookmarked: false,
    },
  ])

  const togglePlay = (shabadId: string) => {
    setShabads((prev) =>
      prev.map((shabad) => ({
        ...shabad,
        isPlaying: shabad.id === shabadId ? !shabad.isPlaying : false,
      })),
    )
    setCurrentlyPlaying(shabadId)
  }

  const toggleLike = (shabadId: string) => {
    setShabads((prev) =>
      prev.map((shabad) => (shabad.id === shabadId ? { ...shabad, isLiked: !shabad.isLiked } : shabad)),
    )
  }

  const toggleBookmark = (shabadId: string) => {
    setShabads((prev) =>
      prev.map((shabad) => (shabad.id === shabadId ? { ...shabad, isBookmarked: !shabad.isBookmarked } : shabad)),
    )
  }

  const filteredShabads = shabads.filter((shabad) => {
    const matchesSearch =
      shabad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shabad.raag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shabad.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesMood = !selectedMood || shabad.mood === selectedMood
    return matchesSearch && matchesMood
  })

  const currentShabad = shabads.find((s) => s.id === currentlyPlaying)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <Music className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-black">Shabad Discover</h1>
                  <p className="text-xs text-black">Spiritual Guide</p>
                </div>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-300"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Shabads, Raags, or artists..."
              className="pl-10 py-3 text-lg border-gray-300 focus:border-black"
            />
          </div>
        </div>

        {/* Mood Selector */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-black mb-4">How are you feeling today?</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedMood === null ? "default" : "outline"}
              onClick={() => setSelectedMood(null)}
              className={selectedMood === null ? "bg-black text-white" : "border-gray-300"}
            >
              All Moods
            </Button>
            {moods.map((mood) => (
              <Button
                key={mood.name}
                variant={selectedMood === mood.name ? "default" : "outline"}
                onClick={() => setSelectedMood(mood.name)}
                className={selectedMood === mood.name ? "bg-black text-white" : "border-gray-300 hover:bg-gray-50"}
              >
                {mood.name}
                <span className="ml-2 text-xs opacity-70">({mood.label})</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black">Filter Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-black mb-2">Raag</h3>
                  <div className="space-y-2">
                    {["All Raags", "Raag Asa", "Raag Gujri", "Raag Ramkali", "Raag Sorath"].map((raag) => (
                      <label key={raag} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{raag}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Duration</h3>
                  <div className="space-y-2">
                    {["Any Length", "Under 5 min", "5-10 min", "Over 10 min"].map((duration) => (
                      <label key={duration} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded border-gray-300" />
                        <span className="text-sm text-gray-700">{duration}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Artist</h3>
                  <div className="space-y-2">
                    {["All Artists", "Bhai Harjinder Singh", "Bhai Manpreet Singh", "Bibi Jasbir Kaur"].map(
                      (artist) => (
                        <label key={artist} className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded border-gray-300" />
                          <span className="text-sm text-gray-700">{artist}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            {filteredShabads.length} Shabad{filteredShabads.length !== 1 ? "s" : ""} found
            {selectedMood && ` for ${selectedMood}`}
          </p>
        </div>

        {/* Shabad List */}
        <div className="space-y-4 mb-8">
          {filteredShabads.map((shabad) => (
            <Card
              key={shabad.id}
              className={`border transition-all duration-200 ${
                shabad.isPlaying ? "border-black shadow-lg bg-gray-50" : "border-gray-200 hover:shadow-md"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Music className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black">{shabad.title}</h3>
                      <div className="flex items-center space-x-4 text-black">
                        <span>{shabad.raag}</span>
                        <span>•</span>
                        <span>{shabad.artist}</span>
                        <span>•</span>
                        <span>{shabad.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            moods.find((m) => m.name === shabad.mood)?.color || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {shabad.mood}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(shabad.id)}
                      className={`hover:bg-gray-100 ${shabad.isLiked ? "text-red-500" : "text-gray-400"}`}
                    >
                      <Heart className={`w-4 h-4 ${shabad.isLiked ? "fill-current" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleBookmark(shabad.id)}
                      className={`hover:bg-gray-100 ${shabad.isBookmarked ? "text-blue-500" : "text-gray-400"}`}
                    >
                      <Bookmark className={`w-4 h-4 ${shabad.isBookmarked ? "fill-current" : ""}`} />
                    </Button>
                    <Button onClick={() => togglePlay(shabad.id)} className="bg-black text-white hover:bg-gray-800">
                      {shabad.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {shabad.isPlaying && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-black">Now Playing</span>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <SkipBack className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <SkipForward className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-black">
                      <span>1:23</span>
                      <div className="flex-1 h-1 bg-gray-300 rounded-full">
                        <div className="w-1/3 h-full bg-black rounded-full"></div>
                      </div>
                      <span>{shabad.duration}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredShabads.length === 0 && (
          <Card className="border border-gray-200">
            <CardContent className="p-12 text-center">
              <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-black mb-2">No Shabads Found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or mood selection to find more Shabads.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedMood(null)
                }}
                variant="outline"
                className="border-gray-300"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
