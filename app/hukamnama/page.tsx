"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Volume2, Share, Bookmark, RefreshCw } from "lucide-react"
import Link from "next/link"

interface HukamnamaData {
  date: string
  dateNanakshahi: string
  ang: string
  raag: string
  gurmukhi: string
  transliteration: string
  punjabi: string
  english: string
  audioHukamnama?: string
  audioKatha?: string
  pdfLink?: string
  source: string
}

export default function HukamnamaPage() {
  const [hukamnamaData, setHukamnamaData] = useState<HukamnamaData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHukamnama = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/hukamnama')
      const result = await response.json()
      
      if (result.success) {
        setHukamnamaData(result.data)
      } else {
        setHukamnamaData(result.data) // fallback data
        setError(result.error)
      }
    } catch (err) {
      setError('Failed to load Hukamnama. Please try again.')
      console.error('Error fetching Hukamnama:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHukamnama()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Loading today's Hukamnama...</p>
        </div>
      </div>
    )
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
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-black">Today's Hukamnama</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="border-gray-300"
                onClick={fetchHukamnama}
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Volume2 className="w-4 h-4 mr-1" />
                Listen
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Share className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-gray-300">
                <Bookmark className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {/* Date and Source */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-black mb-2">
            {hukamnamaData?.date || new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          {hukamnamaData?.dateNanakshahi && (
            <p className="text-black mb-1">{hukamnamaData.dateNanakshahi}</p>
          )}
          {hukamnamaData?.ang && (
            <p className="text-black mb-1">Ang: {hukamnamaData.ang}</p>
          )}
          {hukamnamaData?.raag && (
            <p className="text-black mb-2">{hukamnamaData.raag}</p>
          )}
          <p className="text-black">{hukamnamaData?.source || 'Sri Harmandir Sahib, Amritsar'}</p>
        </div>

        {/* Hukamnama Content */}
        <Card className="mb-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black text-center">ਹੁਕਮਨਾਮਾ ਸਾਹਿਬ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Gurmukhi Text */}
            <div className="text-center">
              <div className="text-xl leading-relaxed text-black mb-6" style={{ fontFamily: "serif" }}>
                {hukamnamaData?.gurmukhi?.split('\n').map((line, index) => (
                  <div key={index} className="mb-2">
                    {line}
                  </div>
                )) || 'Loading...'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Punjabi Explanation */}
        {hukamnamaData?.punjabi && (
          <Card className="mb-8 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black text-center">ਪੰਜਾਬੀ ਵਿਆਖਿਆ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="text-center">
                <div className="text-lg leading-relaxed text-black mb-6" style={{ fontFamily: "serif" }}>
                  {hukamnamaData.punjabi.split('\n').map((line: string, index: number) => (
                    <div key={index} className="mb-2">
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* English Translation */}
        <Card className="mb-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black text-center">English Translation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* English Text */}
            <div className="text-center">
              <div className="text-lg leading-relaxed text-black mb-6" style={{ fontFamily: "serif" }}>
                {hukamnamaData?.english?.split('\n').map((line: string, index: number) => (
                  <div key={index} className="mb-2">
                    {line}
                  </div>
                )) || 'Loading...'}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio and PDF Links */}
        {(hukamnamaData?.audioHukamnama || hukamnamaData?.audioKatha || hukamnamaData?.pdfLink) && (
          <Card className="mb-8 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black text-center">Audio & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {hukamnamaData?.audioHukamnama && (
                  <div className="flex-1">
                    <h4 className="text-black mb-2 text-center">🎵 Hukamnama Audio</h4>
                    <audio controls className="w-full">
                      <source src={hukamnamaData.audioHukamnama} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {hukamnamaData?.audioKatha && (
                  <div className="flex-1">
                    <h4 className="text-black mb-2 text-center">🎵 Katha Audio</h4>
                    <audio controls className="w-full">
                      <source src={hukamnamaData.audioKatha} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
              {hukamnamaData?.pdfLink && (
                <div className="text-center mt-4">
                  <a 
                    href={hukamnamaData.pdfLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    📜 Download PDF
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Daily Guidance */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black">Today's Guidance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                <p className="text-black">
                  <strong>Morning Practice:</strong> Begin your day by reflecting on today's Hukamnama and its teachings.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                <p className="text-black">
                  <strong>Throughout the Day:</strong> Let the wisdom from the Guru's words guide your actions and thoughts.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                <p className="text-black">
                  <strong>Evening Reflection:</strong> Consider how you applied today's spiritual guidance in your daily life.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/daily-paath">
            <Button className="bg-black text-white hover:bg-gray-800">Continue with Daily Paath</Button>
          </Link>
          <Link href="/reflection">
            <Button variant="outline" className="border-gray-300">
              Write Reflection
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
