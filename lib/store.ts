import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
export const useThemeState = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "dark",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme" }
  )
);

type UserState = {
  id: string;
  setId: (id: string) => void;
  username: string;
  setUsername: (username: string) => void;
  isSignedIn: boolean;
  setIsSignedIn: (status: boolean) => void;
};
export const useUserState = create<UserState>()(
  persist(
    (set) => ({
      id: "",
      setId: (id) => set((state) => ({ id: id })),
      username: "",
      setUsername: (username) => set((state) => ({ username: username })),
      isSignedIn: false,
      setIsSignedIn: (status) => set((state) => ({ isSignedIn: status })),
    }),
    { name: "user" }
  )
);
type TalksStateTypes = {
  message: string;
  setMessage: (message: string) => void;
  take: number;
  setTake: (take: number) => void;
  increment: number;
  toggleIncrement: () => void;
};

export const TalksState = create<TalksStateTypes>()(
  persist(
    (set) => ({
      message: "",
      take: 1,
      setMessage: (message) => set((state) => ({ message: message })),
      setTake: (take) => set((state) => ({ take: take })),
      increment: 0,
      toggleIncrement: () =>
        set((state) => ({ increment: state.increment + 1 })),
    }),
    { name: "filter" }
  )
);
