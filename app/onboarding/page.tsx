"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, User, Clock, Target } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    goals: [] as string[],
    preferences: {
      morningReminder: false,
      eveningReminder: false,
      weeklyReflection: false,
    },
  })

  const totalSteps = 3

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const handleComplete = () => {
    // Save user preferences and redirect to dashboard
    console.log("User onboarding completed:", formData)
    // Redirect to main app
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-black">Welcome to SikhAI</h1>
            </div>
            <div className="text-sm text-gray-600">
              Step {step} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <User className="w-5 h-5 mr-2" />
                Tell us about yourself
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-black">
                  What should we call you?
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  className="mt-2 border-gray-300 focus:border-black"
                />
              </div>

              <div>
                <Label className="text-black">How familiar are you with Sikh practices?</Label>
                <div className="mt-3 space-y-2">
                  {[
                    { value: "beginner", label: "I'm just starting my spiritual journey" },
                    { value: "intermediate", label: "I practice occasionally and want to be more consistent" },
                    { value: "advanced", label: "I have a regular practice and want to deepen it" },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name="experience"
                        value={option.value}
                        checked={formData.experience === option.value}
                        onChange={(e) => setFormData((prev) => ({ ...prev, experience: e.target.value }))}
                        className="text-black focus:ring-black"
                      />
                      <span className="text-black">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Goals */}
        {step === 2 && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Target className="w-5 h-5 mr-2" />
                What are your spiritual goals?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-black mb-6">Select all that apply to help us personalize your experience:</p>
              <div className="space-y-4">
                {[
                  "Establish a daily Nitnem practice",
                  "Learn more about Gurbani and its meanings",
                  "Connect with the local Sikh community",
                  "Develop a regular meditation practice",
                  "Understand Sikh history and philosophy",
                  "Practice seva (selfless service)",
                  "Improve my Gurmukhi reading",
                  "Find inner peace and spiritual growth",
                ].map((goal) => (
                  <label key={goal} className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={formData.goals.includes(goal)}
                      onCheckedChange={() => handleGoalToggle(goal)}
                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <span className="text-black">{goal}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-black flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Set your preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-black mb-4">Reminder Settings</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={formData.preferences.morningReminder}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: { ...prev.preferences, morningReminder: checked as boolean },
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <div>
                      <span className="text-black font-medium">Morning Nitnem Reminder</span>
                      <p className="text-black text-sm">Get a gentle reminder for your morning prayers</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={formData.preferences.eveningReminder}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: { ...prev.preferences, eveningReminder: checked as boolean },
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <div>
                      <span className="text-black font-medium">Evening Reflection Reminder</span>
                      <p className="text-black text-sm">Time to reflect on your day and read Rehras Sahib</p>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <Checkbox
                      checked={formData.preferences.weeklyReflection}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferences: { ...prev.preferences, weeklyReflection: checked as boolean },
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-black data-[state=checked]:border-black"
                    />
                    <div>
                      <span className="text-black font-medium">Weekly Spiritual Reflection</span>
                      <p className="text-black text-sm">Weekly prompts to reflect on your spiritual journey</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-black mb-2">Your Journey Starts Now</h4>
                <p className="text-gray-600 text-sm">
                  Welcome to your spiritual journey with SikhAI. We're here to support you every step of the way with
                  respect, wisdom, and technology that honors our beautiful tradition.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="border-gray-300 disabled:opacity-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          {step < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && (!formData.name || !formData.experience)) || (step === 2 && formData.goals.length === 0)
              }
              className="bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete} className="bg-black text-white hover:bg-gray-800">
              Complete Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  )
}
