'use client'

import {useEffect, useState} from 'react'
import {CalendarDateRangePicker} from "@/components/date-range-picker"
import {MainNav} from "@/components/main-nav"
import {Overview} from "@/components/overview"
import {Sidebar} from "@/components/sidebar"
import {EventModal} from "@/components/event-modal"
import {Button} from "@/components/ui/button"
import {Switch} from "@/components/ui/switch"
import {ChevronLeft, ChevronRight, Plus} from 'lucide-react'
import {addDays, addMonths, addYears, format, subDays, subMonths, subYears} from 'date-fns'
import Image from 'next/image'

const earthTheme = {
  primary: "hsl(210, 20%, 50%)", // Soft blue-gray
  secondary: "hsl(180, 15%, 70%)", // Light teal
  background: "hsl(0, 0%, 98%)", // Off-white
  text: "hsl(210, 20%, 25%)", // Dark blue-gray
}

const marsTheme = {
  primary: "hsl(15, 40%, 50%)", // Muted rust
  secondary: "hsl(30, 30%, 60%)", // Soft orange
  background: "hsl(15, 25%, 95%)", // Very light rust
  text: "hsl(15, 40%, 25%)", // Dark rust
}

interface Event {
  id: number;
  title: string;
  description: string;
  start: string;
  end: string;
}

export default function CalendarPage() {
  const [isMarsCal, setIsMarsCal] = useState(false)
  const [currentView, setCurrentView] = useState('week')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [theme, setTheme] = useState(earthTheme)
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [events, setEvents] = useState<Event[]>([])

  // Pobranie wydarzeń z backendu przy starcie
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/events')
        if (response.ok) {
          const data: Event[] = await response.json()
          setEvents(data)
        } else {
          console.error('Failed to fetch events')
        }
      } catch (error) {
        console.error('Error fetching events:', error)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    setTheme(isMarsCal ? marsTheme : earthTheme)
  }, [isMarsCal])

  const formatCurrentState = () => {
    switch (currentView) {
      case 'day':
        return format(currentDate, 'MMMM d, yyyy')
      case 'week':
        const weekEnd = addDays(currentDate, 6)
        return `${format(currentDate, 'MMMM yyyy')}`
      case 'month':
        return format(currentDate, 'MMMM yyyy')
      case 'year':
        return format(currentDate, 'yyyy')
      default:
        return ''
    }
  }

  const navigate = (direction: 'prev' | 'next') => {
    switch (currentView) {
      case 'day':
        setCurrentDate(direction === 'prev' ? subDays(currentDate, 1) : addDays(currentDate, 1))
        break
      case 'week':
        setCurrentDate(direction === 'prev' ? subDays(currentDate, 7) : addDays(currentDate, 7))
        break
      case 'month':
        setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1))
        break
      case 'year':
        setCurrentDate(direction === 'prev' ? subYears(currentDate, 1) : addYears(currentDate, 1))
        break
    }
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setCurrentDate(newDate)
    }
  }

  const handleSaveEvent = (newEvent: Event) => {
    setEvents([...events, newEvent])
  }

  return (
    <div className="hidden flex-col md:flex" style={{
      '--primary': theme.primary,
      '--secondary': theme.secondary,
      '--background': theme.background,
      '--text': theme.text,
      backgroundColor: theme.background,
      color: theme.text
    } as React.CSSProperties}>
      <div className="border-b" style={{ borderColor: theme.secondary }}>
        <div className="flex h-16 items-center px-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              style={{ borderColor: theme.primary, color: theme.primary }}
              onClick={() => setIsEventModalOpen(true)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigate('prev')} style={{ borderColor: theme.primary, color: theme.primary }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium w-40 text-center">{formatCurrentState()}</span>
              <Button variant="outline" size="icon" onClick={() => navigate('next')} style={{ borderColor: theme.primary, color: theme.primary }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <MainNav
  className="mx-6"
  currentView={currentView}
  setCurrentView={setCurrentView}
  theme={theme}
  isMarsCal={isMarsCal} // Pass the state here
/>
          <div className="ml-auto flex items-center space-x-4">
            <CalendarDateRangePicker theme={theme} onDateChange={handleDateChange} />
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Earth.png"
                  alt="Earth"
                  fill
                  className={`rounded-full ${isMarsCal ? 'opacity-50' : 'opacity-100'}`}
                />
              </div>
              <Switch
                checked={isMarsCal}
                onCheckedChange={setIsMarsCal}
                className="data-[state=checked]:bg-red-500"
              >
                <div className="relative w-5 h-5">
                  <Image
                    src={isMarsCal ? "/images/Earth.png" : "/images/Mars.png"}
                    alt={isMarsCal ? "Mars" : "Earth"}
                    layout="fill"
                    className="rounded-full"
                  />
                </div>
              </Switch>
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Mars.png"
                  alt="Mars"
                  fill
                  className={`rounded-full ${isMarsCal ? 'opacity-100' : 'opacity-50'}`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{isMarsCal ? 'Mars' : 'Earth'} Calendar</h2>
        </div>
        <div className="flex space-x-4">
          <Sidebar 
            className="hidden lg:block" 
            isMarsCal={isMarsCal} 
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            theme={theme}
            events={events}
          />
          <Overview 
            currentView={currentView} 
            isMarsCal={isMarsCal} 
            currentDate={currentDate} 
            theme={theme}
            events={events}
          />
        </div>
      </div>
      <EventModal 
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
        theme={theme}
      />
    </div>
  )
}