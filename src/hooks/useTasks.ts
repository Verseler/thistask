import { useState, useEffect } from "react";

import { type Task, type FilteredProject } from "@/pages/authenticated/home/home.types";
import { useAuth } from "@/context/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { getAllTasks, getProjectTask } from "@/services/api/tasks";

function useTasks(filteredProjects: Array<FilteredProject>, selectedProjectId: string) {
  const {user} = useAuth()
  const [tasks, setTasks] = useState<Array<Task>>([]);

  useEffect(() => {
    const isSelectedProjectIsAFilteredProject = filteredProjects.find(
      (project) => project.id === selectedProjectId
    );

    if (isSelectedProjectIsAFilteredProject) {
      fetchAllTasks();
    } else {
      fetchProjectTasks();
    }

  }, [selectedProjectId]);

  
const fetchAllTasks = async () => {
  if (user) {
    const { data: tasks, error } = await getAllTasks(user.id);

    if (error) {
      toast({
        title: "Error: Unable to fetch tasks",
        description: error.message,
      });
    }
    if (tasks) {
      setTasks(tasks);
    }
  } else {
    toast({
      title: "You are not signed in",
      variant: "destructive",
    });
  }
};

const fetchProjectTasks = async () => {
  const { data: tasks, error } = await getProjectTask(selectedProjectId);

  if (error) {
    toast({
      title: "Error: Unable to fetch tasks",
      description: error.message,
    });
  }

  if (tasks) {
    setTasks(tasks);
  }
};

  return ({tasks});
}



export default useTasks;