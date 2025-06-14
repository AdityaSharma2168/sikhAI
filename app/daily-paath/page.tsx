"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Play, Pause, RotateCcw, Clock, CheckCircle, Circle } from "lucide-react"
import Link from "next/link"

export default function DailyPaathPage() {
  const [currentPrayer, setCurrentPrayer] = useState<string | null>(null)
  const [completedPrayers, setCompletedPrayers] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState(false)

  const prayers = [
    { id: "japji", name: "Japji Sahib", duration: "15 min", time: "Morning", completed: false },
    { id: "jaap", name: "Jaap Sahib", duration: "10 min", time: "Morning", completed: false },
    { id: "tav-prasad", name: "Tav-Prasad Savaiye", duration: "5 min", time: "Morning", completed: false },
    { id: "chaupai", name: "Chaupai Sahib", duration: "8 min", time: "Evening", completed: false },
    { id: "anand", name: "Anand Sahib", duration: "12 min", time: "Evening", completed: false },
    { id: "rehras", name: "Rehras Sahib", duration: "20 min", time: "Evening", completed: false },
  ]

  const progress = (completedPrayers.length / prayers.length) * 100

  const togglePrayer = (prayerId: string) => {
    if (completedPrayers.includes(prayerId)) {
      setCompletedPrayers(completedPrayers.filter((id) => id !== prayerId))
    } else {
      setCompletedPrayers([...completedPrayers, prayerId])
    }
  }

  const startPrayer = (prayerId: string) => {
    setCurrentPrayer(prayerId)
    setIsPlaying(true)
  }

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
              <h1 className="text-2xl font-bold text-black">Daily Paath</h1>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-black">{Math.round(progress)}%</div>
              <div className="text-sm text-black">Completed</div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <Card className="mb-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-black">Daily Nitnem Completion</span>
                <span className="font-semibold text-black">
                  {completedPrayers.length} of {prayers.length}
                </span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-200">
                <div
                  className="h-full bg-black rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </Progress>
              <p className="text-sm text-black">
                {completedPrayers.length === prayers.length
                  ? "Waheguru! You've completed all prayers today."
                  : "Keep going, Ji. Every step brings you closer to the divine."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Prayer List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-black mb-4">Daily Prayers</h2>
          {prayers.map((prayer) => {
            const isCompleted = completedPrayers.includes(prayer.id)
            const isCurrent = currentPrayer === prayer.id

            return (
              <Card
                key={prayer.id}
                className={`border transition-all duration-200 ${
                  isCurrent
                    ? "border-black shadow-lg"
                    : isCompleted
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 hover:shadow-md"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => togglePrayer(prayer.id)}
                        className="text-2xl hover:scale-110 transition-transform duration-200"
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                      <div>
                        <h3 className={`text-lg font-semibold ${isCompleted ? "text-green-800" : "text-black"}`}>
                          {prayer.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-black">
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {prayer.duration}
                          </span>
                          <Badge variant="outline" className="border-gray-300 text-gray-600">
                            {prayer.time}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {isCurrent && (
                        <div className="flex items-center space-x-2 mr-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="border-gray-300"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setCurrentPrayer(null)}
                            className="border-gray-300"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </Button>
                        </div>
                      )}

                      {isCompleted ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
                      ) : (
                        <Button
                          onClick={() => startPrayer(prayer.id)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          {isCurrent ? "Continue" : "Begin"}
                        </Button>
                      )}
                    </div>
                  </div>

                  {isCurrent && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <h4 className="font-semibold text-black mb-2">Now Playing: {prayer.name}</h4>
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                          <span>2:34 / {prayer.duration}</span>
                          <div className="w-32 h-1 bg-gray-300 rounded-full">
                            <div className="w-1/3 h-full bg-black rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Encouragement Message */}
        {completedPrayers.length > 0 && (
          <Card className="mt-8 border border-gray-200 bg-gray-50">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold text-black mb-2">Waheguru Ji Ka Khalsa, Waheguru Ji Ki Fateh!</h3>
              <p className="text-black">
                {completedPrayers.length === prayers.length
                  ? "You have completed all your daily prayers. May Guru's blessings be with you always."
                  : `You've completed ${completedPrayers.length} prayer${
                      completedPrayers.length > 1 ? "s" : ""
                    } today. Keep up the beautiful practice!`}
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
