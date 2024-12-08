import {Card} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {format, isAfter} from "date-fns";

interface Event {
  id: number;
  title: string;
  description: string;
  start: string; // ISO string (e.g., "2024-12-08T09:00:00")
  end: string; // ISO string
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  currentDate: Date;
  events: Event[];
}

export function Sidebar({ className, currentDate, theme, events }: SidebarProps) {
  // Filter and sort upcoming events
  const upcomingEvents = events
    .filter((event) => isAfter(new Date(event.start), currentDate)) // Only events after the current date
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()) // Sort by start date
    .slice(0, 5); // Limit to 5 events

  return (
    <Card
      className={cn("w-[300px] p-4", className)}
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        borderColor: theme.secondary,
      }}
    >
      <div className="space-y-4">
        {/* Bold and more readable title */}
        <div className="text-lg font-bold">Upcoming Events</div>
        <div className="grid gap-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-2">
                {/* Event color marker */}
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-1" />
                {/* Display event details */}
                <div>
                  {/* Event Title */}
                  <div className="text-sm font-medium">{event.title}</div>
                  {/* Event Date and Time */}
                  <div className="text-xs text-gray-500">
                    {format(new Date(event.start), "EEEE, MMM d, yyyy 'at' p")}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-gray-500">No upcoming events</div>
          )}
        </div>
      </div>
    </Card>
  );
}
