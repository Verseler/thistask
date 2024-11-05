import { Sun, Moon } from "lucide-react";
import { HTMLProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useInitializeTheme from "@/hooks/useInitializeTheme";

type ThemeSwitchProps = {
  className?: HTMLProps<HTMLElement>["className"];
};

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { theme, handleChangeTheme } = useInitializeTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      handleChangeTheme("dark");
    } else {
      handleChangeTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
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
