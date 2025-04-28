"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DarkModeToggle from "./DarkMode";

const menuItems = [
  { name: "추천 문제", path: "/recommend" },
  { name: "리뷰 커뮤니티", path: "/community" },
  { name: "AI 리뷰", path: "/review-list" },
];

export default function Header() {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }

    // 다크모드 상태를 실시간으로 감지하기 위해 MutationObserver 사용
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full flex justify-between items-center px-24 py-4 shadow-sm bg-white dark:bg-neutral-900 transition-colors">
      <div className="flex items-center gap-10">
        <Link href="/">
          <img
            src={isDarkMode ? "/DarkModeLogo.png" : "/LightModeLogo.png"}
            alt="ALGOING Logo"
            className="h-8"
          />
        </Link>

        <nav className="flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-medium ${
                pathname === item.path
                  ? "text-primary font-bold dark:text-gray-300 dark:font-bold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-primary hover:font-bold transition`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <DarkModeToggle />
        <input
          type="text"
          placeholder="문제번호, 제목, 키워드"
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 focus:outline-none"
        />
        <img
          src="/profile-icon.png"
          alt="프로필"
          className="w-8 h-8 rounded-full border-2 border-yellow-300"
        />
      </div>
    </header>
  );
}
