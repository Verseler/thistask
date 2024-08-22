import { Trash } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItemsProps = {
  name: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  onClickDeletion?: () => void;
};

const NavItems = ({
  name,
  icon,
  isActive,
  onClick,
  onClickDeletion,
}: NavItemsProps) => {
  const VARIANT_STYLE: ButtonProps["variant"] = isActive ? "default" : "ghost";
  const ACTIVE_STYLE: string = isActive
    ? "font-bold bg-primary-500 dark:bg-primary-600 dark:text-white"
    : "font-normal dark:text-gray-400";

  return (
    <div className="relative group">
      <Button
        variant={VARIANT_STYLE}
        size="sm"
        className={cn(
          "justify-start w-full py-6 md:py-0 rounded text-lg md:text-sm",
          ACTIVE_STYLE
        )}
        onClick={onClick}
      >
        {icon}
        <span className="overflow-hidden truncate md:w-40 text-start whitespace-nowrap">
          {name}
        </span>
      </Button>
      {onClickDeletion && (
        <Trash
          onClick={onClickDeletion}
          className="absolute hidden text-red-500 cursor-pointer top-4 md:top-2 right-4 md:right-2 size-4 group-hover:block"
        />
      )}
    </div>
  );
};

export default NavItems;
