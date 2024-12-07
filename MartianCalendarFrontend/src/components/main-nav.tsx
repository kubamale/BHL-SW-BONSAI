import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  currentView: string;
  setCurrentView: (view: string) => void;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
}

export function MainNav({
  className,
  currentView,
  setCurrentView,
  theme,
  ...props
}: MainNavProps) {
  const views = ['day', 'week', 'month', 'year']

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {views.map((view) => (
        <Button
          key={view}
          onClick={() => setCurrentView(view)}
          variant={currentView === view ? "default" : "ghost"}
          className="text-sm font-medium transition-colors hover:text-primary"
          style={{
            backgroundColor: currentView === view ? theme.primary : 'transparent',
            color: currentView === view ? theme.background : theme.text,
          }}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </Button>
      ))}
    </nav>
  )
}

