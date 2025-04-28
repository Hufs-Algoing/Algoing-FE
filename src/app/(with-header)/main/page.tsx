"use client";

import DarkModeToggle from "@/app/_components/DarkMode";
import { cn } from "@/app/lib/utils";
import React from "react";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionCalendarProps {
  year: number;
  month: number;
  contributions: ContributionDay[];
}

function ContributionCalendar({
  year,
  month,
  contributions,
}: ContributionCalendarProps) {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();

  const calendarDays = Array(42)
    .fill(null)
    .map((_, index) => {
      const day = index - firstDay + 1;
      if (day > 0 && day <= daysInMonth) {
        const dateStr = `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
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

  const getColorClass = (count: number) => {
    if (count === 0)
      return "bg-white dark:bg-neutral-700 border border-gray-200 dark:border-gray-600";
    if (count === 1) return "bg-green-200 dark:bg-green-700";
    if (count <= 3) return "bg-green-300 dark:bg-green-800";
    return "bg-green-600 dark:bg-green-900";
  };

  return (
    <div className="text-sm">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-7 gap-1">
            {week.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={cn(
                  "aspect-square rounded-md",
                  day ? getColorClass(day.count) : "opacity-0"
                )}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-200 dark:bg-green-700 rounded-sm"></div>
          <span className="text-xs">1 solved</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-300 dark:bg-green-800 rounded-sm"></div>
          <span className="text-xs">3 solved</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-600 dark:bg-green-900 rounded-sm"></div>
          <span className="text-xs">5 solved</span>
        </div>
      </div>
    </div>
  );
}

const RecommendedProblems = () => {
  return (
    <div className="flex flex-col gap-2">
   
      <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-300">30251</p>
          <p className="font-medium">루미의 생일파티장 꾸미기</p>
          <p className="text-xs text-gray-400 dark:text-gray-500">2025.03.05</p>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
        <p className="font-medium">루미의 생일파티장 꾸미기</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">2025.03.05</p>
      </div>
      <div className="bg-gray-100 dark:bg-neutral-800 p-4 rounded-lg">
        <p className="font-medium">루미의 생일파티장 꾸미기</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">2025.03.05</p>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const contributions = [
    { date: "2025-03-17", count: 1 },
    { date: "2025-03-18", count: 3 },
    { date: "2025-03-19", count: 5 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center gap-4 mb-16">
        <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-neutral-700" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">nickname123</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            134 문제 해결
          </p>
          <Progress
            value={60}
            className="mt-2 h-3 bg-gray-200 dark:bg-neutral-700"
          />
        </div>
        <button className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-medium">
          성장 그래프
        </button>
        <button className="px-2 py-2 bg-gray-200 dark:bg-neutral-700 rounded-lg text-sm font-medium">
          코드
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-6">
        <div className="border dark:border-gray-700 rounded-xl p-4">
          <h2 className="text-center text-lg font-semibold mb-2">2025.3</h2>
          <ContributionCalendar
            year={2025}
            month={3}
            contributions={contributions}
          />
        </div>

        <div className="flex flex-col gap-6">
          <div className="border dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2">
              새로 추가된 사용자 리뷰
            </h3>

            <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg border dark:border-gray-700 text-sm">
              <p>
                이거어떻게 하면되나요 시간초과 되는데 이거어떻게했는데 어떻게
                해야할까요ㅠㅠㅠㅠㅠ
              </p>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                2025.03.25
              </div>
            </div>
          </div>
          <div className="border dark:border-gray-700 rounded-xl p-4">
            <h3 className="text-sm font-semibold mb-2">오늘의 추천문제</h3>
            <RecommendedProblems />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

interface ProgressProps {
  value: number; // 0 ~ 100
  className?: string;
}

const Progress = ({ value, className = "" }: ProgressProps) => {
  return (
    <div
      className={`relative w-full rounded-full overflow-hidden ${className}`}
    >
      <div
        className="h-full bg-purple-400 dark:bg-purple-700 transition-all duration-300 ease-in-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
