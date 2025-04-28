"use client";

import { useState } from "react";
import { cn } from "@/app/lib/utils";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionCalendarProps {
  year: number;
  month: number;
  contributions: ContributionDay[];
}

export default function ContributionCalendar({
  year,
  month,
  contributions,
}: ContributionCalendarProps) {
  const [currentYear, setCurrentYear] = useState(year);
  const [currentMonth, setCurrentMonth] = useState(month);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

  const calendarDays = Array(42)
    .fill(null)
    .map((_, index) => {
      const day = index - firstDay + 1;
      if (day > 0 && day <= daysInMonth) {
        const dateStr = `${currentYear}-${currentMonth.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
        const contribution = contributions.find((c) => c.date === dateStr);
        return {
          day,
          count: contribution?.count || 0,
          date: dateStr,
        };
      }
      return null;
    });

  const weeks = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(calendarDays.slice(i * 7, (i + 1) * 7));
  }

  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(12);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="text-sm">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          ◀
        </button>
        <h2 className="text-lg font-bold">
          {currentYear}.{currentMonth}
        </h2>
        <button
          onClick={handleNextMonth}
          className="px-2 py-1 text-sm rounded hover:bg-gray-100 dark:hover:bg-neutral-700"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-bold uppercase tracking-wide text-gray-600 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="space-y-1">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={cn(
                  "aspect-square rounded-md transition-all duration-200",
                  day ? getColorClass(day.count) : "opacity-0"
                )}
              >
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 mt-6">
        <LegendItem color="bg-green-200 dark:bg-green-700" label="1 solved" />
        <LegendItem color="bg-green-300 dark:bg-green-800" label="2~3 solved" />
        <LegendItem color="bg-green-600 dark:bg-green-900" label="4+ solved" />
      </div>
    </div>
  );
}

function getColorClass(count: number) {
  if (count === 0)
    return "bg-white dark:bg-neutral-700 border border-gray-200 dark:border-gray-600";
  if (count === 1) return "bg-green-200 dark:bg-green-700";
  if (count <= 3) return "bg-green-300 dark:bg-green-800";
  return "bg-green-600 dark:bg-green-900";
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1">
      <div className={`w-4 h-4 rounded-sm ${color}`} />
      <span className="text-xs">{label}</span>
    </div>
  );
}
