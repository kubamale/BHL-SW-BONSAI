'use client'

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  currentView: string;
  setCurrentView: (view: string) => void;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  isMarsCal: boolean; // Determines if the Mars calendar is active
}

export function MainNav({
  className,
  currentView,
  setCurrentView,
  theme,
  isMarsCal,
  ...props
}: MainNavProps) {
  const views = ["day", "week", "month", "year"];
  const [currentTime, setCurrentTime] = useState("");
  const [marsTime, setMarsTime] = useState("");

  useEffect(() => {
    console.log("useEffect triggered, isMarsCal:", isMarsCal);

    const updateEarthTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString());
      console.log("Updating Earth time:", now.toLocaleString());
    };

    const updateMarsTime = async () => {
      console.log("updateMarsTime called");
      try {
        const now = new Date();
        const response = await fetch("http://localhost:8080/api/conversions/toMartian", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(now.toISOString()),
        });

        if (!response.ok) {
          console.error("Failed to fetch Mars time, status:", response.status);
          setMarsTime("Error fetching Mars time");
          return;
        }

        const marsData = await response.json();
        console.log("Mars data received:", marsData);

        const formattedMarsTime = ` ${marsData.day} ${marsData.month} ${marsData.year}, ` +
          `${String(marsData.hour).padStart(2, '0')}:${String(marsData.minute).padStart(2, '0')}:${String(marsData.second).padStart(2, '0')}`;

        setMarsTime(formattedMarsTime);
      } catch (error) {
        console.error("Error fetching Mars time:", error);
        setMarsTime("Error fetching Mars time");
      }
    };

    // Update immediately
    if (isMarsCal) {
      updateMarsTime();
    } else {
      updateEarthTime();
    }

    const intervalId = setInterval(() => {
      console.log("Interval triggered, isMarsCal:", isMarsCal);
      if (isMarsCal) {
        updateMarsTime();
      } else {
        updateEarthTime();
      }
    }, 1000);

    return () => {
      console.log("Clearing interval");
      clearInterval(intervalId);
    };
  }, [isMarsCal]);

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <div className="text-sm font-medium" style={{ color: theme.text }}>
        {isMarsCal ? marsTime : currentTime}
      </div>
      {views.map((view) => (
        <Button
          key={view}
          onClick={() => setCurrentView(view)}
          variant={currentView === view ? "default" : "ghost"}
          className="text-sm font-medium transition-colors hover:text-primary"
          style={{
            backgroundColor: currentView === view ? theme.primary : "transparent",
            color: currentView === view ? theme.background : theme.text,
          }}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </Button>
      ))}
    </nav>
  );
}