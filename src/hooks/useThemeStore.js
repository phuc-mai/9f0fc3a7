import { create } from "zustand";

const useThemeStore = create(
  (set) => ({
    mode: "light",
    toggleMode: () =>
      set((state) => ({ mode: state.mode === "light" ? "dark" : "light" })),
  }),
  {
    name: "theme-storage",
  }
);

export default useThemeStore;
