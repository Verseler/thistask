import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import ThemeSwitch from "./ThemeSwitch";
import AppLogo from "@/components/common/AppLogo";

type HeaderProps = {
  toggleShowMobileSidebar: () => void;
};

const Header = ({ toggleShowMobileSidebar }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 px-2 bg-white border-b h-14 md:px-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between w-full gap-2 md:justify-end md:ml-auto">
        <AppLogo className="mobile-component md:hidden" />
        <div className="hidden md:block">
          <UserAvatar />
        </div>

        <ThemeSwitch className="hidden md:flex" />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleShowMobileSidebar}
          className="text-black mobile-component dark:text-white md:hidden"
        >
          <Menu size={33} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
