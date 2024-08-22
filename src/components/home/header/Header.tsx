import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./UserAvatar";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import ThemeSwitch from "./ThemeSwitch";
import AppLogo from "@/components/common/AppLogo";

type HeaderProps = {
  toggleShowMobileSidebar: () => void;
};

const Header = ({ toggleShowMobileSidebar }: HeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const userName = `${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`;
  const userProfile = user?.user_metadata.avatar_url;
  const userEmail = user?.email;

  const handleLogout = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    const { error } = await logout();

    if (error) {
      toast({
        title: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 flex items-center gap-4 px-4 bg-white border-b h-14 md:px-6 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center justify-between w-full gap-2 md:justify-end md:ml-auto">
        <AppLogo className="mobile-component md:hidden" />
        <span className="hidden text-sm text-gray-600 md:block dark:text-slate-400">
          {userEmail}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="hidden md:block">
            <Button variant="secondary" size="icon" className="rounded-full">
              <UserAvatar src={userProfile} name={userName} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-800">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem disabled onClick={() => navigate("/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="text-red-600 dark:text-red-500"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

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
