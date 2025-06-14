"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, MessageCircle, BookOpen, Heart, Lightbulb } from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export default function AIGuidancePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Sat Sri Akal, Ji! I'm here to help you with your spiritual journey. You can ask me about Gurbani, Sikh history, daily practices, or seek guidance on any spiritual matter. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const quickQuestions = [
    "What is the meaning of Waheguru?",
    "How should I start my day with Nitnem?",
    "Explain the significance of the Five Ks",
    "What does Guru Nanak teach about equality?",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsLoading(false)
    }, 1500)
  }

  const getAIResponse = (question: string): string => {
    const responses = {
      waheguru:
        "Waheguru (ਵਾਹਿਗੁਰੂ) is the primary name for God in Sikhism. It expresses wonder and awe at the divine. 'Wahe' means 'Wow!' or 'What a wonder!' and 'Guru' means 'teacher' or 'enlightener.' Together, it means 'Wonderful Teacher' or 'Wonderful Enlightener.' This name encompasses the divine qualities of being the ultimate teacher who brings light to darkness.",
      nitnem:
        "Starting your day with Nitnem is a beautiful practice. Begin with Japji Sahib, which sets the spiritual tone for the day. Wake up early, cleanse yourself, and sit in a quiet place facing east if possible. Read with devotion, understanding, and contemplation. Don't rush - let each word resonate in your heart. Follow with Jaap Sahib and Tav-Prasad Savaiye to complete the morning prayers.",
      "five ks":
        "The Five Ks (Panj Kakar) are five items of faith that Khalsa Sikhs wear at all times: Kesh (uncut hair), Kara (steel bracelet), Kanga (wooden comb), Kachera (cotton undergarments), and Kirpan (steel sword). They represent spiritual and physical preparedness, equality, cleanliness, modesty, and the duty to protect the innocent.",
      equality:
        "Guru Nanak taught that all human beings are equal regardless of caste, creed, gender, or social status. He established the concepts of 'Ik Onkar' (One Creator), showing that we all come from the same divine source. The practice of Langar (community kitchen) where everyone sits together and eats the same food exemplifies this teaching of equality and brotherhood.",
    }

    const lowerQuestion = question.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (lowerQuestion.includes(key)) {
        return response
      }
    }

    return "Thank you for your question. This is a profound spiritual inquiry that deserves thoughtful consideration. In Sikh philosophy, we believe that all answers can be found through sincere devotion, study of Gurbani, and connection with the Guru. I encourage you to reflect on this question during your daily prayers and meditation. Would you like me to suggest some specific Shabads or teachings that might provide insight into your question?"
  }

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-black">AI Spiritual Guidance</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Quick Questions */}
        <Card className="mb-6 border border-gray-200">
          <CardHeader>
            <CardTitle className="text-black flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Quick Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="text-left h-auto p-3 border-gray-300 hover:bg-gray-50 justify-start"
                  onClick={() => handleQuickQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6 border border-gray-200">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      message.type === "user" ? "bg-black text-white" : "bg-gray-100 text-black border border-gray-200"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <p className={`text-xs mt-2 ${message.type === "user" ? "text-gray-300" : "text-black"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-black border border-gray-200 px-4 py-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Message Input */}
        <Card className="border border-gray-200">
          <CardContent className="p-4">
            <div className="flex space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about Gurbani, Sikh teachings, or spiritual guidance..."
                className="flex-1 border-gray-300 focus:border-black"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Guidance Categories */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Daily Practice",
              description: "Questions about Nitnem, meditation, and daily spiritual routines",
              icon: BookOpen,
            },
            {
              title: "Gurbani Wisdom",
              description: "Understanding Sikh scriptures, teachings, and philosophy",
              icon: Heart,
            },
            {
              title: "Life Guidance",
              description: "Applying Sikh principles to modern life challenges",
              icon: Lightbulb,
            },
          ].map((category, index) => (
            <Card key={index} className="border border-gray-200 hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-6 text-center">
                <category.icon className="w-8 h-8 text-black mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-2">{category.title}</h3>
                <p className="text-sm text-black">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
