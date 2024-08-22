import { HTMLProps } from "react";
import AppIcon from "@/assets/images/logo/appIcon.png";
import { cn } from "@/lib/utils";

type AppLogoProps = {
  className?: HTMLProps<HTMLElement>["className"];
};

export default function AppLogo({ className }: AppLogoProps) {
  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      <img src={AppIcon} alt="app logo" className="size-9" />
      <span
        aria-label="app title"
        className="text-2xl font-medium md:inline dark:text-gray-200"
      >
        <span className=" text-primary-500">this</span>Task
      </span>
    </div>
  );
}
