// hooks/useLoadUser.ts (또는 로그인 후 처리 위치)
"use client";
import { useEffect } from "react";
import { useUserStore } from "../_store/use-user-store";

export function useLoadUser() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://api.al-going.com/api/myinfo", {
          credentials: "include",
        });

        const data = await res.json();

        if (data.isSuccess && data.result) {
          const { name, picture } = data.result;
          setUser(name, picture);
        }
      } catch (e) {
        console.error("유저 정보 불러오기 실패:", e);
      }
    };

    fetchUser();
  }, []);
}
