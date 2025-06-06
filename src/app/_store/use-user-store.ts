// stores/useUserStore.ts
import { create } from "zustand";

interface UserState {
  name: string | null;
  picture: string | null;
  setUser: (name: string, picture: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: null,
  picture: null,
  setUser: (name, picture) => set({ name, picture }),
  clearUser: () => set({ name: null, picture: null }),
}));
