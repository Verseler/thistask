import { SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

type SelectItemOptionProps = {
  value: string;
  name?: string;
  icon: JSX.Element;
  className?: HTMLProps<HTMLElement>["className"];
};

export default function SelectItemOption({
  value,
  icon,
  className,
  name,
}: SelectItemOptionProps) {
  const nameLabel: string = name ? name : value;

  return (
    <SelectItem
      value={value}
      className={cn(
        "dark:bg-gray-800 h-12 md:h-9 dark:text-gray-300 cursor-pointer",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <div className="my-1">{icon}</div>
        <p className="text-base md:text-sm">{nameLabel}</p>
      </div>
    </SelectItem>
  );
}
