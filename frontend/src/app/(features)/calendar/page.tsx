// components/CalendarApp.tsx
"use client";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useState } from "react";

interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function CalendarApp() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Reunião com time",
      start: "2025-07-03T10:00:00",
      end: "2025-07-03T11:00:00",
    },
    {
      id: "2",
      title: "Chamada com cliente",
      start: "2025-07-05T15:00:00",
      end: "2025-07-05T16:30:00",
    },
  ]);

  const handleDateClick = (arg: DateClickArg) => {
    const title = prompt("Título do evento:");
    if (title) {
      const newEvent: CalendarEvent = {
        id: String(Date.now()),
        title,
        start: arg.dateStr,
        end: arg.dateStr,
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleEventDrop = (arg: EventDragStopArg) => {
    const updatedEvents = events.map((event) =>
      event.id === arg.event.id
        ? {
            ...event,
            start: arg.event.start?.toISOString() || "",
            end: arg.event.end?.toISOString() || "",
          }
        : event,
    );
    setEvents(updatedEvents);
  };

  return (
    <div className="w-full h-full p-4">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        themeSystem="standard"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        locale="pt-br"
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        events={events}
        dateClick={handleDateClick}
        eventDrop={handleEventDrop}
        height="100%"
      />
    </div>
  );
}
