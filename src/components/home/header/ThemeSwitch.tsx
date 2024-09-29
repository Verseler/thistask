import { Sun, Moon } from "lucide-react";
import { HTMLProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useTheme from "@/hooks/useTheme";

type ThemeSwitchProps = {
  className?: HTMLProps<HTMLElement>["className"];
};

const ThemeSwitch = ({ className }: ThemeSwitchProps) => {
  const { theme, handleChangeTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => handleChangeTheme(theme)}
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
