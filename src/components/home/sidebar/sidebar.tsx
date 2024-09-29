import { X, Hash } from "lucide-react";

import { Button } from "@/components/ui/button";
import NavItems from "./NavItems";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppLogo from "@/components/common/AppLogo";
import UserAvatar from "../header/UserAvatar";
import ThemeSwitch from "../header/ThemeSwitch";
import AddProjectInput from "./AddProjectInput";
import { addProject, deleteProject } from "@/services/api/projects";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthProvider/AuthProvider";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import { useEffect, useState } from "react";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getProjects } from "@/services/api";
import { filteredProjects } from "@/pages/authenticated/home/Home";
import { useBoundStore } from "@/zustand/useBoundStore";
import { Project } from "@/pages/authenticated/home/home.types";

type SidebarProps = {
  showMobileSidebar: boolean;
  toggleShowMobileSidebar: () => void;
};

export default function Sidebar({
  showMobileSidebar,
  toggleShowMobileSidebar,
}: SidebarProps) {
  const { user } = useAuth();
  //! i use ! operator to assert the user is not null or undefined
  const { data = [] } = useQuery(getProjects(user!.id), {
    refetchInterval: 1000,
  });
  const projects = data as Array<Project>;

  const setProjects = useBoundStore((state) => state.setProjects);
  const selectedProjectId = useBoundStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useBoundStore(
    (state) => state.setSelectedProjectId
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  //set fetched projects to global projects state
  useEffect(() => {
    setProjects(projects);
  }, [data]);

  const showDeleteDialog = () => setIsDialogOpen(true);
  const hideDeleteDialog = () => setIsDialogOpen(false);

  const handleAddProject = async (projectName: string) => {
    if (!user) {
      toast({
        title: "Error: You are not signed in",
        variant: "destructive",
      });
      return;
    }

    const { error } = await addProject(projectName, user?.id);

    if (error) {
      toast({
        title: "Error: unable to add new project",
        description: error.message,
      });
    } else {
      toast({
        title: "Project added successfully",
        duration: 1500,
      });
    }
  };

  const handleDeleteProject = async () => {
    if (!user) {
      toast({
        title: "Error: You are not signed in",
        variant: "destructive",
      });
      return;
    }

    const { error } = await deleteProject(selectedProjectId);

    if (error) {
      toast({
        title: "Error: unable to delete project",
        description: error.message,
      });
    } else {
      setSelectedProjectId(filteredProjects[0].id);
      hideDeleteDialog();
      toast({
        title: "Project deleted successfully",
        duration: 1500,
      });
    }
  };

  /*
   *
   *  UI
   *
   */
  const RenderFilteredProjects = filteredProjects?.map((project, index) => (
    <NavItems
      key={index}
      name={project?.name}
      isActive={selectedProjectId === project?.id}
      showDelete={false}
      onClick={() => setSelectedProjectId(project?.id)}
      icon={project?.icon}
    />
  ));

  const ProjectSectionLabel = projects && projects?.length > 0 && (
    <h2 className="relative text-lg font-semibold tracking-tight dark:text-white">
      {projects?.length == 1 ? "Project" : "Projects"}
    </h2>
  );

  const RenderProjects =
    projects &&
    projects?.map((project, index) => (
      <NavItems
        key={index}
        name={project?.name || "Untitled"}
        isActive={selectedProjectId === project?.id}
        onClick={() => setSelectedProjectId(project?.id)}
        onClickDeletion={showDeleteDialog}
        showDelete={selectedProjectId === project?.id}
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
        <div className="px-2 py-1 md:px-4 md:py-2">
          <AppLogo className="hidden mb-6 md:flex" />

          <div className="flex items-center justify-between mb-8 md:hidden mobile-content">
            <UserAvatar orderReversed />

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

          <AddProjectInput onAddProject={handleAddProject} className="mt-8" />

          <div className="mt-4 space-y-1 mb-7">{RenderFilteredProjects}</div>

          <ScrollArea className="py-2 h-72">
            {ProjectSectionLabel}
            <div className="space-y-1">{RenderProjects}</div>
          </ScrollArea>
        </div>
      </nav>

      <ConfirmationDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onClickConfirm={handleDeleteProject}
        desc="This action cannot be undone. This will permanently delete the project."
        confirmLabel="Delete"
        confirmStyle="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500"
      />
    </div>
  );
}
