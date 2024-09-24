import { useState, useEffect } from "react";

import { type Task, type FilteredProject } from "@/pages/authenticated/home/home.types";
import { useAuth } from "@/context/AuthProvider/AuthProvider";
import { toast } from "@/components/ui/use-toast";
import { getAllTasks, getProjectTasks } from "@/services/api/tasks";

function useTasks(filteredProjects: Array<FilteredProject>, selectedProjectId: string) {
  const {user} = useAuth()
  const [tasks, setTasks] = useState<Array<Task>>([]);
  const [loadingFetchingTask, setLoadingFetchingTask] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const selectedTask: Task | null  = tasks.find((task) => task.id === selectedTaskId) as Task;

  const changeSelectedTaskId = (taskId: string): void => setSelectedTaskId(taskId); 

  const clearSelectedTaskId = (): void => setSelectedTaskId(null);

  useEffect(() => {
    fetchTasks();

  }, [selectedProjectId]);

  const fetchTasks = async () => {
    const isSelectedProjectIsAFilteredProject = filteredProjects.find(
      (project) => project.id === selectedProjectId
    ) !== undefined;


    if (isSelectedProjectIsAFilteredProject) {
      handleGetAllTasks()
    } else {
      handleGetProjectTasks()
    }
  };
  

  
const handleGetProjectTasks = async () => {
  try {
    setLoadingFetchingTask(true);
    const { data, error } = await getProjectTasks(selectedProjectId);
  const tasks = data as Array<Task>;
  
  if (error) {
    toast({
      title: "Error: Unable to fetch tasks",
      description: error.message,
    });
  }

  if (tasks) {
    setTasks(tasks);
  }
  }
  catch(err) {
    const error = err as Error
    toast({
      title: "Error: Unable to fetch tasks",
      description: error.message,
    });
  }
  finally {
    setLoadingFetchingTask(false);
  }
};

  
const handleGetAllTasks = async () => {
  try {
    setLoadingFetchingTask(true);

    if (user) {
      const { data, error } = await getAllTasks(user.id);
      const tasks = data as Array<Task>
  
      if (error) {
        toast({
          title: "Error: Unable to fetch tasks",
          description: error.message,
        });
      }
      if (tasks) {
        const currentDate = new Date();
  
        if(selectedProjectId === "today") {
          const filteredTasks: Task[] = tasks.filter(
            (task) => new Date(task.due_date as string).toDateString() === currentDate.toDateString())
  
          setTasks(filteredTasks);
        }
        else if(selectedProjectId === "tomorrow") {
          const tomorrowDate =  currentDate.setDate(currentDate.getDate() + 1);
          const filteredTasks: Task[] = tasks.filter(
            (task) => new Date(task.due_date as string).toDateString() === new Date(tomorrowDate).toDateString())
            
          setTasks(filteredTasks);
        }
        else if(selectedProjectId === "completed") {
          const filteredTasks: Task[] = tasks.filter((task) => task.status === "Completed")
          setTasks(filteredTasks);
        }
        else {
          setTasks(tasks);
        }
      }
    } else {
      toast({
        title: "You are not signed in",
        variant: "destructive",
      });
    }
  }
  catch(err) {
    const error = err as Error
    toast({
      title: "Error: Unable to fetch tasks",
      description: error.message,
    });
  }
  finally {
    setLoadingFetchingTask(false);
  }
};



  return ({tasks, changeSelectedTaskId, clearSelectedTaskId, selectedTask,  refetchTasks: fetchTasks, loadingFetchingTask});
}



export default useTasks;