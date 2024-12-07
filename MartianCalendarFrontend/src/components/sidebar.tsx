import {Calendar} from "@/components/ui/calendar"
import {Card} from "@/components/ui/card"
import {cn} from "@/lib/utils"
import {format} from "date-fns"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isMarsCal: boolean;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export function Sidebar({ className, isMarsCal, currentDate, setCurrentDate, theme }: SidebarProps) {
  const monthName = isMarsCal ? "Sagittarius" : format(currentDate, 'MMMM')
  const year = isMarsCal ? "36" : format(currentDate, 'yyyy')

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date)
    }
  }

  return (
    <Card className={cn("w-[300px] p-4", className)} style={{ backgroundColor: theme.background, color: theme.text, borderColor: theme.secondary }}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">{`${monthName} ${year}`}</h2>
        </div>
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={handleSelect}
          className="rounded-md border"
          styles={{
            day_selected: { backgroundColor: theme.primary, color: theme.background },
            day_today: { color: theme.primary },
          }}
        />
        <div className="space-y-4">
          <div className="text-sm font-medium">Upcoming Events</div>
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <div className="text-sm">Coffee Chat (9:00 AM)</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <div className="text-sm">Health Benefits Walkthrough (10:00 AM)</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

