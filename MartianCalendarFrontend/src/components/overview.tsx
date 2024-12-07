import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  startOfWeek,
  addDays,
  format,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
  parseISO,
  isWithinInterval,
  addHours,
  setHours,
  setMinutes,
  setSeconds
} from 'date-fns';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Event {
  title: string;
  description: string;
  start: string;
  end: string;
}

interface OverviewProps {
  currentView: string;
  isMarsCal: boolean;
  currentDate: Date;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  events: Event[];
}

export function Overview({ currentView, isMarsCal, currentDate, theme, events }: OverviewProps) {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedEvent(null)
    setIsModalOpen(false)
  }

  const renderEvent = (event: Event) => (
    <div 
      key={event.title} 
      className="text-xs p-1 rounded cursor-pointer"
      style={{ backgroundColor: theme.secondary, color: theme.text }}
      onClick={() => handleEventClick(event)}
    >
      {event.title}
    </div>
  )

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i) // 0 do 23
    const startOfCurrentDay = setSeconds(setMinutes(setHours(currentDate, 0), 0), 0)
    const endOfCurrentDay = addHours(startOfCurrentDay, 24)

    return (
      <div className="overflow-auto max-h-[600px]">
        <Table style={{ borderColor: theme.secondary }}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" style={{ color: theme.text }}>Time</TableHead>
              <TableHead style={{ color: theme.text }}>Event</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hours.map((hour) => {
              const startOfHour = setSeconds(setMinutes(setHours(currentDate, hour), 0), 0)
              const endOfHour = addHours(startOfHour, 1)

              const slotEvents = events.filter((event) => {
                const eventStart = parseISO(event.start)
                const eventEnd = parseISO(event.end)
                const eventOverlapsDay = eventEnd > startOfCurrentDay && eventStart < endOfCurrentDay
                const eventOverlapsHour = eventEnd > startOfHour && eventStart < endOfHour
                return eventOverlapsDay && eventOverlapsHour
              })

              return (
                <TableRow key={hour}>
                  <TableCell className="font-medium" style={{ color: theme.text }}>
                    {format(startOfHour, 'HH:mm')}
                  </TableCell>
                  <TableCell>
                    {slotEvents.map(renderEvent)}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
    const hours = Array.from({ length: 24 }, (_, i) => i)

    return (
      <div className="overflow-auto max-h-[600px]">
        <Table style={{ borderColor: theme.secondary }}>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]" style={{ color: theme.text }} />
              {days.map((day) => (
                <TableHead
                  key={day.toISOString()}
                  className="text-center"
                  style={{ color: theme.text }}
                >
                  <div className="font-normal text-xs">{format(day, 'EEE')}</div>
                  <div className="text-xl">
                    {format(day, 'd')}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {hours.map((hour) => {
              return (
                <TableRow key={hour}>
                  <TableCell className="font-medium" style={{ color: theme.text }}>
                    {hour.toString().padStart(2, '0')}:00
                  </TableCell>
                  {days.map((day) => {
                    const startOfHour = setSeconds(setMinutes(setHours(day, hour), 0), 0)
                    const endOfHour = addHours(startOfHour, 1)

                    const slotEvents = events.filter((event) => {
                      const eventStart = parseISO(event.start)
                      const eventEnd = parseISO(event.end)
                      return eventEnd > startOfHour && eventStart < endOfHour
                    })

                    return (
                      <TableCell key={`${day.toISOString()}-${hour}`} className="h-24">
                        {slotEvents.map(renderEvent)}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    )
  }

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate)
    const monthEnd = endOfMonth(currentDate)
    const startDate = startOfWeek(monthStart)
    const endDate = startOfWeek(monthEnd)

    const weeks = []
    let currentWeek = startDate

    while (currentWeek <= endDate) {
      weeks.push(
        Array.from({ length: 7 }, (_, i) => addDays(currentWeek, i))
      )
      currentWeek = addDays(currentWeek, 7)
    }

    return (
      <Table style={{ borderColor: theme.secondary }}>
        <TableHeader>
          <TableRow>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <TableHead key={day} className="text-center" style={{ color: theme.text }}>{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {weeks.map((week, weekIndex) => (
            <TableRow key={weekIndex}>
              {week.map((day) => {
                const dayStart = setHours(setMinutes(setSeconds(day,0),0),0)
                const dayEnd = addHours(dayStart,24)

                const dayEvents = events.filter((event) => {
                  const eventStart = parseISO(event.start)
                  const eventEnd = parseISO(event.end)
                  return eventEnd > dayStart && eventStart < dayEnd
                })

                return (
                  <TableCell key={day.toISOString()} className="h-24 text-center">
                    <span className={cn(
                      isSameMonth(day, currentDate) ? '' : 'text-muted-foreground',
                      isSameDay(day, currentDate) && "rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                      isSameDay(day, currentDate) && { backgroundColor: theme.primary, color: theme.background }
                    )}>
                      {format(day, 'd')}
                    </span>
                    <div className="mt-1">
                      {dayEvents.map(renderEvent)}
                    </div>
                  </TableCell>
                )
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderYearView = () => {
    const year = currentDate.getFullYear()

    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, monthIndex) => {
          const monthDate = new Date(year, monthIndex, 1)
          const firstDayOfMonth = new Date(year, monthIndex, 1)
          const monthStartDay = firstDayOfMonth.getDay()

          return (
            <Table key={monthIndex} style={{ borderColor: theme.secondary }}>
              <TableHeader>
                <TableRow>
                  <TableHead colSpan={7} className="text-center" style={{ color: theme.text }}>
                    {format(monthDate, 'MMMM')}
                  </TableHead>
                </TableRow>
                <TableRow>
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <TableHead key={`${monthIndex}-${day}`} className="text-center p-1" style={{ color: theme.text }}>{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 6 }).map((_, weekIndex) => (
                  <TableRow key={`${monthIndex}-week-${weekIndex}`}>
                    {Array.from({ length: 7 }).map((_, dayIndex) => {
                      const dayNumber = (weekIndex * 7 + dayIndex) - monthStartDay + 1
                      const day = new Date(year, monthIndex, dayNumber)

                      if (day.getMonth() !== monthIndex) {
                        return <TableCell key={`${monthIndex}-day-${weekIndex * 7 + dayIndex}`} className="text-center p-1"></TableCell>
                      }

                      const dayStart = setHours(setMinutes(setSeconds(day,0),0),0)
                      const dayEnd = addHours(dayStart,24)

                      const dayEvents = events.filter((event) => {
                        const eventStart = parseISO(event.start)
                        const eventEnd = parseISO(event.end)
                        return eventEnd > dayStart && eventStart < dayEnd
                      })

                      const hasEvents = dayEvents.length > 0

                      return (
                        <TableCell key={`${monthIndex}-day-${weekIndex * 7 + dayIndex}`} className="text-center p-1 align-top">
                          <span
                            className={cn(
                              "inline-block w-6 h-6 leading-6 text-center rounded-full",
                              isSameDay(day, currentDate) && "font-bold",
                            )}
                            style={hasEvents ? { backgroundColor: theme.secondary, color: theme.background } : {}}
                          >
                            {format(day, 'd')}
                          </span>
                          {hasEvents && (
                            <div className="mt-1 text-xs space-y-1">
                              {dayEvents.map(renderEvent)}
                            </div>
                          )}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">
        {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
      </h2>

      {/* Conditional Rendering of Views */}
      {currentView === 'day' && renderDayView()}
      {currentView === 'week' && renderWeekView()}
      {currentView === 'month' && renderMonthView()}
      {currentView === 'year' && renderYearView()}

      {/* Modal for Event Details */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black p-4 rounded shadow-md w-64">
            <h3 className="font-bold text-lg mb-2">{selectedEvent.title}</h3>
            <p className="text-sm mb-2">{selectedEvent.description}</p>
            <p className="text-xs mb-1">
              Start: {format(parseISO(selectedEvent.start), "PPpp")}
            </p>
            <p className="text-xs mb-2">
              End: {format(parseISO(selectedEvent.end), "PPpp")}
            </p>
            {/* Close Button using ShadCN */}
            <Button
              style={{ color: theme.text }}
              onClick={handleCloseModal}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  )};