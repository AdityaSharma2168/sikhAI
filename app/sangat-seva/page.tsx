"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Calendar,
  Phone,
  Globe,
  Navigation,
  Search,
  Filter,
  Heart,
  Utensils,
  BookOpen,
  Car,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  type: "seva" | "paath" | "kirtan" | "langar" | "education"
  location: string
  address: string
  date: string
  time: string
  attendees: number
  description: string
  contact: string
  website?: string
  isCommitted: boolean
}

interface Gurdwara {
  id: string
  name: string
  address: string
  phone: string
  website?: string
  distance: string
  services: string[]
  timings: {
    morning: string
    evening: string
  }
}

export default function SangatSevaPage() {
  const [activeTab, setActiveTab] = useState<"events" | "gurdwaras">("events")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Weekly Langar Seva",
      type: "seva",
      location: "Gurdwara Sahib Downtown",
      address: "123 Main Street, Downtown",
      date: "2024-01-21",
      time: "11:00 AM - 2:00 PM",
      attendees: 24,
      description: "Join us for weekly langar preparation and service. Help cook, serve, and clean.",
      contact: "(555) 123-4567",
      website: "www.gurdwaradowntown.org",
      isCommitted: false,
    },
    {
      id: "2",
      title: "Akhand Paath Sahib",
      type: "paath",
      location: "Gurdwara Singh Sabha",
      address: "456 Oak Avenue, Westside",
      date: "2024-01-19",
      time: "6:00 PM - 8:00 PM",
      attendees: 45,
      description: "48-hour continuous reading of Sri Guru Granth Sahib. All sangat welcome to participate.",
      contact: "(555) 987-6543",
      isCommitted: true,
    },
    {
      id: "3",
      title: "Youth Kirtan Program",
      type: "kirtan",
      location: "Community Center",
      address: "789 Pine Road, Eastside",
      date: "2024-01-20",
      time: "7:00 PM - 9:00 PM",
      attendees: 18,
      description: "Monthly kirtan program featuring young kirtanis. Learn and participate in divine music.",
      contact: "(555) 456-7890",
      isCommitted: false,
    },
    {
      id: "4",
      title: "Punjabi Language Classes",
      type: "education",
      location: "Khalsa School",
      address: "321 Elm Street, Northside",
      date: "2024-01-22",
      time: "10:00 AM - 12:00 PM",
      attendees: 32,
      description: "Weekly Punjabi and Gurmukhi classes for children and adults. All levels welcome.",
      contact: "(555) 234-5678",
      website: "www.khalsaschool.org",
      isCommitted: false,
    },
    {
      id: "5",
      title: "Community Langar",
      type: "langar",
      location: "Gurdwara Sahib Central",
      address: "654 Maple Drive, Central",
      date: "2024-01-23",
      time: "12:00 PM - 3:00 PM",
      attendees: 67,
      description: "Special community langar with traditional Punjabi dishes. Everyone welcome.",
      contact: "(555) 345-6789",
      isCommitted: false,
    },
  ])

  const gurdwaras: Gurdwara[] = [
    {
      id: "1",
      name: "Gurdwara Sahib Downtown",
      address: "123 Main Street, Downtown",
      phone: "(555) 123-4567",
      website: "www.gurdwaradowntown.org",
      distance: "0.8 miles",
      services: ["Daily Paath", "Langar", "Parking", "Library"],
      timings: {
        morning: "5:00 AM - 12:00 PM",
        evening: "6:00 PM - 9:00 PM",
      },
    },
    {
      id: "2",
      name: "Gurdwara Singh Sabha",
      address: "456 Oak Avenue, Westside",
      phone: "(555) 987-6543",
      distance: "2.3 miles",
      services: ["Kirtan", "Youth Programs", "Punjabi Classes", "Wedding Hall"],
      timings: {
        morning: "4:30 AM - 11:30 AM",
        evening: "6:30 PM - 9:30 PM",
      },
    },
    {
      id: "3",
      name: "Gurdwara Sahib Central",
      address: "654 Maple Drive, Central",
      phone: "(555) 345-6789",
      website: "www.gurdwaracentral.org",
      distance: "1.5 miles",
      services: ["24/7 Darshan", "Community Kitchen", "Guest House", "Medical Camp"],
      timings: {
        morning: "24 Hours",
        evening: "24 Hours",
      },
    },
  ]

  const eventTypes = [
    { value: "seva", label: "Seva", icon: Heart, color: "bg-red-100 text-red-800" },
    { value: "paath", label: "Paath", icon: BookOpen, color: "bg-blue-100 text-blue-800" },
    { value: "kirtan", label: "Kirtan", icon: Users, color: "bg-purple-100 text-purple-800" },
    { value: "langar", label: "Langar", icon: Utensils, color: "bg-green-100 text-green-800" },
    { value: "education", label: "Education", icon: GraduationCap, color: "bg-orange-100 text-orange-800" },
  ]

  const toggleCommitment = (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) => (event.id === eventId ? { ...event, isCommitted: !event.isCommitted } : event)),
    )
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = !selectedEventType || event.type === selectedEventType
    return matchesSearch && matchesType
  })

  const getEventIcon = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType ? eventType.icon : Heart
  }

  const getEventColor = (type: string) => {
    const eventType = eventTypes.find((t) => t.value === type)
    return eventType ? eventType.color : "bg-gray-100 text-gray-800"
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
                  <Users className="w-4 h-4 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-black">Sangat & Seva</h1>
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
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <Button
            variant={activeTab === "events" ? "default" : "ghost"}
            onClick={() => setActiveTab("events")}
            className={activeTab === "events" ? "bg-black text-white" : "text-gray-600 hover:text-black"}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Events & Seva
          </Button>
          <Button
            variant={activeTab === "gurdwaras" ? "default" : "ghost"}
            onClick={() => setActiveTab("gurdwaras")}
            className={activeTab === "gurdwaras" ? "bg-black text-white" : "text-gray-600 hover:text-black"}
          >
            <MapPin className="w-4 h-4 mr-2" />
            Gurdwaras
          </Button>
        </div>

        {/* Events Tab */}
        {activeTab === "events" && (
          <>
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events, locations, or activities..."
                  className="pl-10 py-3 text-lg border-gray-300 focus:border-black"
                />
              </div>
            </div>

            {/* Event Type Filter */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-4">What would you like to participate in?</h2>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedEventType === null ? "default" : "outline"}
                  onClick={() => setSelectedEventType(null)}
                  className={selectedEventType === null ? "bg-black text-white" : "border-gray-300"}
                >
                  All Events
                </Button>
                {eventTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedEventType === type.value ? "default" : "outline"}
                    onClick={() => setSelectedEventType(type.value)}
                    className={
                      selectedEventType === type.value ? "bg-black text-white" : "border-gray-300 hover:bg-gray-50"
                    }
                  >
                    <type.icon className="w-4 h-4 mr-2" />
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Events List */}
            <div className="space-y-6">
              {filteredEvents.map((event) => {
                const EventIcon = getEventIcon(event.type)
                return (
                  <Card
                    key={event.id}
                    className={`border transition-all duration-200 ${
                      event.isCommitted ? "border-green-200 bg-green-50" : "border-gray-200 hover:shadow-md"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                            <EventIcon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-black mb-2">{event.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-black mb-2">
                              <span className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1" />
                                {event.location}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {event.time}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {event.attendees} attending
                              </span>
                            </div>
                            <Badge variant="outline" className={`${getEventColor(event.type)} border-0 mb-3`}>
                              {eventTypes.find((t) => t.value === event.type)?.label}
                            </Badge>
                          </div>
                        </div>
                        {event.isCommitted && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Committed</Badge>
                        )}
                      </div>

                      <p className="text-black mb-4">{event.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-black">
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {event.contact}
                          </span>
                          {event.website && (
                            <span className="flex items-center">
                              <Globe className="w-4 h-4 mr-1" />
                              <a href={`https://${event.website}`} className="text-blue-600 hover:underline">
                                Website
                              </a>
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-3">
                          <Button variant="outline" size="sm" className="border-gray-300">
                            <Navigation className="w-4 h-4 mr-1" />
                            Directions
                          </Button>
                          <Button
                            onClick={() => toggleCommitment(event.id)}
                            className={
                              event.isCommitted
                                ? "bg-green-600 text-white hover:bg-green-700"
                                : "bg-black text-white hover:bg-gray-800"
                            }
                          >
                            {event.isCommitted ? "Committed" : "Commit to Attend"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredEvents.length === 0 && (
              <Card className="border border-gray-200">
                <CardContent className="p-12 text-center">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">No Events Found</h3>
                  <p className="text-black mb-4">
                    Try adjusting your search terms or event type selection to find more opportunities.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedEventType(null)
                    }}
                    variant="outline"
                    className="border-gray-300"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Gurdwaras Tab */}
        {activeTab === "gurdwaras" && (
          <>
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-black mb-4">Gurdwaras Near You</h2>
              <p className="text-black">Find local Gurdwaras for daily paath, kirtan, and community services.</p>
            </div>

            <div className="space-y-6">
              {gurdwaras.map((gurdwara) => (
                <Card
                  key={gurdwara.id}
                  className="border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-black mb-2">{gurdwara.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-black mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {gurdwara.address}
                          </span>
                          <span className="flex items-center">
                            <Navigation className="w-4 h-4 mr-1" />
                            {gurdwara.distance}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {gurdwara.services.map((service) => (
                            <Badge key={service} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-black mb-1">Timings</h4>
                        <p className="text-sm text-black">Morning: {gurdwara.timings.morning}</p>
                        <p className="text-sm text-black">Evening: {gurdwara.timings.evening}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-black mb-1">Contact</h4>
                        <p className="text-sm text-black flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {gurdwara.phone}
                        </p>
                        {gurdwara.website && (
                          <p className="text-sm text-black flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            <a href={`https://${gurdwara.website}`} className="text-blue-600 hover:underline">
                              {gurdwara.website}
                            </a>
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button variant="outline" className="border-gray-300">
                        <Navigation className="w-4 h-4 mr-1" />
                        Get Directions
                      </Button>
                      <Button variant="outline" className="border-gray-300">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      {gurdwara.website && (
                        <Button variant="outline" className="border-gray-300">
                          <Globe className="w-4 h-4 mr-1" />
                          Visit Website
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Seva Opportunities Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-black mb-6">Ways to Serve</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Kitchen Seva",
                description: "Help prepare langar meals",
                icon: Utensils,
                color: "bg-green-50 border-green-200",
              },
              {
                title: "Cleaning Seva",
                description: "Maintain Gurdwara cleanliness",
                icon: Heart,
                color: "bg-blue-50 border-blue-200",
              },
              {
                title: "Parking Seva",
                description: "Assist with parking management",
                icon: Car,
                color: "bg-purple-50 border-purple-200",
              },
              {
                title: "Teaching Seva",
                description: "Teach Punjabi and Gurbani",
                icon: GraduationCap,
                color: "bg-orange-50 border-orange-200",
              },
            ].map((seva, index) => (
              <Card key={index} className={`border transition-all duration-200 hover:shadow-md ${seva.color}`}>
                <CardContent className="p-6 text-center">
                  <seva.icon className="w-8 h-8 text-gray-700 mx-auto mb-3" />
                  <h3 className="font-semibold text-black mb-2">{seva.title}</h3>
                  <p className="text-sm text-black mb-4">{seva.description}</p>
                  <Button size="sm" variant="outline" className="border-gray-300">
                    Volunteer
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
