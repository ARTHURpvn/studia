"use client";

import { CalendarView } from "@/app/(features)/calendar/types/calendar";

interface Props {
  currentView: CalendarView;
  onChangeView: (view: CalendarView) => void;
}

export function CalendarViewSwitcher({ currentView, onChangeView }: Props) {
  return (
    <div className="flex gap-2">
      {["day", "week", "month"].map((v) => (
        <button
          key={v}
          onClick={() => onChangeView(v as CalendarView)}
          className={`px-4 py-2 rounded text-sm font-medium border ${
            currentView === v
              ? "bg-red-600 text-white"
              : "bg-transparent text-zinc-200 border-zinc-600 hover:bg-zinc-800"
          }`}
        >
          {v.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
