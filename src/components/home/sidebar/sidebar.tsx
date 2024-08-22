import { X, Hash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NavItems from "./NavItems";
import { cn } from "@/lib/utils";
import { FilteredProject } from "@/pages/authenticated/home/home.types";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppLogo from "@/components/common/AppLogo";
import UserAvatar from "../header/UserAvatar";
import { useAuth } from "@/context/AuthProvider";
import { useNavigate } from "react-router-dom";
import ThemeSwitch from "../header/ThemeSwitch";

type SidebarProps = {
  selectedProjectId: string;
  projects: Array<any>;
  filteredProjects: Array<FilteredProject>;
  handleChangeProject: (id: string) => void;
  showMobileSidebar: boolean;
  toggleShowMobileSidebar: () => void;
};

export default function Sidebar({
  selectedProjectId,
  filteredProjects,
  projects,
  handleChangeProject,
  showMobileSidebar,
  toggleShowMobileSidebar,
}: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = `${user?.user_metadata?.first_name} ${user?.user_metadata?.last_name}`;
  const userProfile = user?.user_metadata.avatar_url;
  const userEmail = user?.email;

  /*
   *
   *  UI
   *
   */
  const RenderFilteredProjects = filteredProjects?.map((project, index) => {
    return (
      <NavItems
        key={index}
        name={project?.name}
        isActive={selectedProjectId == project?.id}
        onClick={() => handleChangeProject(project?.id)}
        icon={project?.icon}
      />
    );
  });

  const ProjectSectionLabel = projects?.length > 0 && (
    <h2 className="relative text-lg font-semibold tracking-tight dark:text-white">
      {projects?.length == 1 ? "Project" : "Projects"}
    </h2>
  );

  const RenderProjects = projects?.map((project, index) => (
    <NavItems
      key={index}
      name={project?.name}
      isActive={selectedProjectId === project?.id}
      onClick={() => handleChangeProject(project?.id)}
      // onClickDeletion={() => deleteProject(project?.id)}
      icon={<Hash className="mr-2 md:size-4" />}
    />
  ));

  const sidebarStyle = showMobileSidebar ? "block" : "hidden md:block";

  return (
    <div
      className={cn(
        "pb-12 w-full absolute inset-0 bg-white z-50 md:static md:w-60 border-r dark:bg-gray-900 dark:border-gray-800",
        sidebarStyle
      )}
    >
      <nav className="py-2 space-y-4">
        <div className="px-4 py-1 md:py-2">
          <AppLogo className="hidden mb-6 md:flex" />

          <div className="flex items-center justify-between mb-8 md:hidden">
            <div className="space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="rounded-full"
                  >
                    <UserAvatar src={userProfile} name={userName} />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="dark:bg-gray-800">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    disabled
                    onClick={() => navigate("/settings")}
                  >
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-red-600 dark:text-red-500"
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <span className="text-gray-600 md:text-sm dark:text-slate-400">
                {userEmail}
              </span>
            </div>

            <div className="flex items-center">
              <ThemeSwitch className="mr-2" />
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleShowMobileSidebar}
                className="h-full text-black mobile-component dark:text-white"
              >
                <X size={33} />
              </Button>
            </div>
          </div>

          {/* <AddTaskInput
            value={newProjectName}
            onValueChange={setNewProjectName}
            handleSubmit={addProject}
            loading={loading}
          /> */}

          <div className="mt-6 mb-8 space-y-1">{RenderFilteredProjects}</div>

          <div className="py-2">
            <ScrollArea className="h-[300px]">
              {ProjectSectionLabel}
              <div className="space-y-1">{RenderProjects}</div>
            </ScrollArea>
          </div>
        </div>
      </nav>
    </div>
  );
}
