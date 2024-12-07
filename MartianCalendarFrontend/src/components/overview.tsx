import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {addDays, endOfMonth, format, isSameDay, isSameMonth, parseISO, startOfMonth, startOfWeek} from 'date-fns'
import {cn} from "@/lib/utils"

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
  const hours = Array.from({ length: 11 }, (_, i) => i + 7) // 7 AM to 5 PM

  const renderEvent = (event: Event) => (
    <div 
      key={event.title} 
      className="text-xs p-1 rounded"
      style={{ backgroundColor: theme.secondary, color: theme.text }}
    >
      {event.title}
    </div>
  )

  const renderDayView = () => (
    <Table style={{ borderColor: theme.secondary }}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]" style={{ color: theme.text }}>Time</TableHead>
          <TableHead style={{ color: theme.text }}>Event</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {hours.map((hour) => (
          <TableRow key={hour}>
            <TableCell className="font-medium" style={{ color: theme.text }}>{`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}</TableCell>
            <TableCell>
              {events
                .filter(event => {
                  const eventStart = parseISO(event.start)
                  return eventStart.getHours() === hour && isSameDay(eventStart, currentDate)
                })
                .map(renderEvent)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  const renderWeekView = () => {
    const weekStart = startOfWeek(currentDate)
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

    return (
      <Table style={{ borderColor: theme.secondary }}>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            {days.map((day) => (
              <TableHead key={day.toISOString()} className="text-center">
                <div className="font-normal text-xs" style={{ color: theme.text }}>{format(day, 'EEE')}</div>
                <div className={cn(
                  "text-xl",
                  isSameDay(day, currentDate) && "rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                  isSameDay(day, currentDate) && { backgroundColor: theme.primary, color: theme.background }
                )}>
                  {format(day, 'd')}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {hours.map((hour) => (
            <TableRow key={hour}>
              <TableCell className="font-medium" style={{ color: theme.text }}>{`${hour}:00 ${hour < 12 ? 'AM' : 'PM'}`}</TableCell>
              {days.map((day) => (
                <TableCell key={`${day.toISOString()}-${hour}`} className="h-24">
                  {events
                    .filter(event => {
                      const eventStart = parseISO(event.start)
                      return eventStart.getHours() === hour && isSameDay(eventStart, day)
                    })
                    .map(renderEvent)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
              {week.map((day) => (
                <TableCell key={day.toISOString()} className="h-24 text-center">
                  <span className={cn(
                    isSameMonth(day, currentDate) ? '' : 'text-muted-foreground',
                    isSameDay(day, currentDate) && "rounded-full w-8 h-8 flex items-center justify-center mx-auto",
                    isSameDay(day, currentDate) && { backgroundColor: theme.primary, color: theme.background }
                  )}>
                    {format(day, 'd')}
                  </span>
                  <div className="mt-1">
                    {events
                      .filter(event => isSameDay(parseISO(event.start), day))
                      .map(renderEvent)}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }

  const renderYearView = () => (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, monthIndex) => {
        const monthDate = new Date(currentDate.getFullYear(), monthIndex, 1)
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
                    const day = new Date(currentDate.getFullYear(), monthIndex, weekIndex * 7 + dayIndex - new Date(currentDate.getFullYear(), monthIndex, 1).getDay() + 1)
                    return (
                      <TableCell key={`${monthIndex}-day-${weekIndex * 7 + dayIndex}`} className="text-center p-1">
                        {isSameMonth(day, monthDate) && (
                          <span className={cn(
                            isSameDay(day, currentDate) && "rounded-full w-6 h-6 flex items-center justify-center mx-auto text-xs",
                            isSameDay(day, currentDate) && { backgroundColor: theme.primary, color: theme.background }
                          )}>
                            {format(day, 'd')}
                          </span>
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

  return (
    <div className="flex-1 overflow-auto">
      <h2 className="text-2xl font-bold mb-4">
        {currentView.charAt(0).toUpperCase() + currentView.slice(1)} View
      </h2>
      {currentView === 'day' && renderDayView()}
      {currentView === 'week' && renderWeekView()}
      {currentView === 'month' && renderMonthView()}
      {currentView === 'year' && renderYearView()}
    </div>
  )
}

