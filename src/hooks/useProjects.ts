import { useState, useEffect } from "react";
import { type Project, type FilteredProject } from "@/pages/authenticated/home/home.types";
import { useAuth } from "@/context/AuthProvider/AuthProvider";
import { getProjects } from "@/services/api";
import { toast } from "@/components/ui/use-toast";

export default function useProjects(filteredProjects: Array<FilteredProject>) {
  const {user} = useAuth()
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(filteredProjects[0].id);

  const changeSelectedProjectId = (projectId: string): void =>
    setSelectedProjectId(projectId);

  const fetchProjects = async (): Promise<void> => {
    if (user) {
      const { data: projects, error } = await getProjects(user?.id);

      if (error) {
        toast({
          title: "Fetching Projects Error",
          description: error.message,
        });
        return;
      }

      if (projects) {
        setProjects(projects);
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return ({projects, selectedProjectId, changeSelectedProjectId, refetchProjects : fetchProjects});
}


