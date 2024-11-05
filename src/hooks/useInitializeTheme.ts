import { useLocalStorage } from "usehooks-ts";
import {  useEffect } from "react";
import { type ColorScheme } from "@/lib/types";

export default function useInitializeTheme() {
const [theme, setTheme] = useLocalStorage<ColorScheme>("theme", "light");

useEffect(() => {
  document.body.classList.remove("light", "dark");
  document.body.classList.add(theme);
}, [theme]);

const handleChangeTheme = (newTheme: ColorScheme): void => {
  setTheme(newTheme);
};

return {theme, handleChangeTheme};
}