import { Sun, Moon } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { HTMLProps, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type ColorScheme } from "@/lib/types";

type ThemeSwitchProps = {
  className?: HTMLProps<HTMLElement>["className"];
};

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const [theme, setTheme] = useLocalStorage<ColorScheme>("theme", "light");
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const handleThemeChange = (currentTheme: ColorScheme): void => {
    setTheme(currentTheme == "dark" ? "light" : "dark");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleThemeChange(theme)}
      className={cn("text-black", className)}
    >
      {theme === "light" ? (
        <Sun className="size-7 md:size-5" color="black" />
      ) : (
        <Moon className="size-7 md:size-5" color="white" />
      )}
    </Button>
  );
};

export default ThemeSwitch;
