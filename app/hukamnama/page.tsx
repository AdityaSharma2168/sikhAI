"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Volume2, Share, Bookmark } from "lucide-react"
import Link from "next/link"

export default function HukamnamaPage() {
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
        {/* Date and Source */}
        <div className="text-center mb-8">
          <h2 className="text-lg font-semibold text-black mb-2">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h2>
          <p className="text-black">Sri Harmandir Sahib, Amritsar</p>
        </div>

        {/* Hukamnama Content */}
        <Card className="mb-8 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black text-center">ਹੁਕਮਨਾਮਾ ਸਾਹਿਬ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Gurmukhi Text */}
            <div className="text-center">
              <div className="text-2xl leading-relaxed text-black font-medium mb-4" style={{ fontFamily: "serif" }}>
                ਸਲੋਕੁ ਮਃ ੧ ॥
              </div>
              <div className="text-xl leading-relaxed text-black mb-6" style={{ fontFamily: "serif" }}>
                ਸਤਿਗੁਰ ਨਾਨਕ ਪ੍ਰਗਟਿਆ ਮਿਟੀ ਧੁੰਧ ਜਗ ਚਾਨਣ ਹੋਆ ॥<br />
                ਜਿਉ ਕਰ ਸੂਰਜ ਨਿਕਲਿਆ ਤਾਰੇ ਛਪੇ ਅੰਧੇਰ ਪਲੋਆ ॥੧॥
              </div>
            </div>

            {/* Transliteration */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-3">Transliteration:</h3>
              <p className="text-black leading-relaxed italic">
                Salok Ma 1 ||
                <br />
                Satigur Nanak Pragatia Miti Dhundh Jag Chanan Hoa ||
                <br />
                Jio Kar Suraj Niklia Tare Chhape Andher Paloa ||1||
              </p>
            </div>

            {/* English Translation */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-black mb-3">Translation:</h3>
              <p className="text-black leading-relaxed">
                <strong>Shalok, First Mehl:</strong>
                <br />
                With the manifestation of the True Guru Nanak, the mist cleared and the world became illuminated.
                <br />
                Just as when the sun rises, the stars disappear and the darkness runs away. ||1||
              </p>
            </div>

            {/* Meaning and Reflection */}
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-black mb-3">Spiritual Reflection:</h3>
              <p className="text-black leading-relaxed">
                This beautiful Shalok celebrates the advent of Guru Nanak Dev Ji and the spiritual enlightenment he
                brought to the world. Just as the sun dispels darkness and makes the stars invisible by its brilliant
                light, the Guru's divine wisdom removes the darkness of ignorance and illuminates the path of truth.
              </p>
              <p className="text-black leading-relaxed mt-4">
                Today, let us reflect on how we can allow the Guru's light to shine through us, dispelling the darkness
                of ego, hatred, and ignorance from our hearts and minds. May we become instruments of this divine light
                in our daily interactions.
              </p>
            </div>
          </CardContent>
        </Card>

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
                  <strong>Morning Practice:</strong> Begin your day by acknowledging the divine light within you and
                  around you.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                <p className="text-black">
                  <strong>Throughout the Day:</strong> Be a source of positivity and wisdom for others, just as the Guru
                  is for us.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                <p className="text-black">
                  <strong>Evening Reflection:</strong> Consider how you shared the Guru's light today and how you can do
                  better tomorrow.
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
