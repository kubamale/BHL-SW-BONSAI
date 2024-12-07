"use client"

import * as React from "react"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface CalendarDateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  onDateChange: (date: Date | undefined) => void;
}

export function CalendarDateRangePicker({
  className,
  theme,
  onDateChange,
}: CalendarDateRangePickerProps) {
  const [date, setDate] = React.useState<Date>()

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate)
    onDateChange(newDate)
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            style={{ borderColor: theme.secondary, color: theme.text }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" style={{ backgroundColor: theme.background }}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateChange}
            initialFocus
            styles={{
              day_selected: { backgroundColor: theme.primary, color: theme.background },
              day_today: { color: theme.primary },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

