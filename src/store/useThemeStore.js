import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme:localStorage.getItem("Stramify-theme") ||"coffee",
  setTheme: (theme) => {
    localStorage.setItem("Stramify-theme",theme);
    set({theme})
  }
}));
