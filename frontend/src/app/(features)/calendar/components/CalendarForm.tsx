"use client";

import "tui-calendar/dist/tui-calendar.css";

import { useEffect, useRef } from "react";
import Calendar from "tui-calendar";

export default function SimpleCalendar() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const calendarInstanceRef = useRef<Calendar | null>(null);

  useEffect(() => {
    if (!calendarRef.current || calendarInstanceRef.current) return;

    const calendar = new Calendar(calendarRef.current, {
      defaultView: "week",
      useCreationPopup: false,
      useDetailPopup: true,
      calendars: [
        {
          id: "1",
          name: "Pessoal",
          bgColor: "#f43f5e",
          borderColor: "#f43f5e",
        },
      ],
    });

    calendar.createSchedules([
      {
        id: "event-1",
        calendarId: "1",
        title: "Estudar React",
        category: "time",
        start: new Date().toISOString(),
        end: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      },
    ]);

    calendarInstanceRef.current = calendar;

    return () => {
      calendar.destroy();
      calendarInstanceRef.current = null;
    };
  }, []);

  return (
    <div className="p-4 w-full">
      <div ref={calendarRef} className="w-full h-full" />
    </div>
  );
}
