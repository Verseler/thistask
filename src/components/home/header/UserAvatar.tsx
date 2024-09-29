import { AvatarImage, AvatarFallback, Avatar } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { getFirstNameInitial } from "./header.helper";

type UserAvatarProps = {
  orderReversed?: boolean;
};

export default function UserAvatar({ orderReversed }: UserAvatarProps) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const firstName: string = user?.user_metadata?.first_name;
  const lastName: string = user?.user_metadata?.last_name;

  const userName = `${firstName} ${lastName}`;
  const userProfileSrc = user?.user_metadata.avatar_url;
  const nameInitial = getFirstNameInitial(userName);

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
    <div
      className={cn(
        "flex items-center gap-x-2",
        orderReversed ? "flex-row-reverse" : "flex-row"
      )}
    >
      <span className="text-sm text-gray-600 dark:text-slate-400">
        {userName}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage
                className="rounded-full "
                src={userProfileSrc}
                alt="user profile"
              />
              <AvatarFallback>{nameInitial}</AvatarFallback>
            </Avatar>
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
    </div>
  );
}
