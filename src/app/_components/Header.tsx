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
    <header className="fixed top-0 z-50 w-full flex justify-between items-center px-8 md:px-24 py-4 shadow-sm bg-white dark:bg-neutral-900 transition-colors backdrop-blur-md">
      <div className="flex items-center gap-12">
        <Link href="/" className="hover:opacity-80 transition">
          <img
            src={isDarkMode ? "/DarkModeLogo.png" : "/LightModeLogo.png"}
            alt="ALGOING Logo"
            className="h-8"
          />
        </Link>

        <nav className="flex gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm font-semibold transition ${
                pathname === item.path
                  ? "text-primary dark:text-primary font-bold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-primary dark:hover:text-primary`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <DarkModeToggle />
        <div className="relative">
          <input
            type="text"
            placeholder="문제 번호, 제목, 키워드"
            className="text-sm px-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary transition w-48 md:w-60"
          />
        </div>
        <Link href="/profile" className="hover:opacity-80 transition">
          <img
            src="/profile2.jpg"
            alt="프로필"
            className="w-9 h-9 rounded-full border-2 shadow-md"
          />
        </Link>
      </div>
    </header>
  );
}
