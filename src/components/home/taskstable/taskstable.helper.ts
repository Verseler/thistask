
import { Project, Task } from "@/pages/authenticated/home/home.types"
import { filteredProjects } from "@/pages/authenticated/home/Home";

export const getProjectName = (projects: Array<Project>, selectedProjectId: string) => projects.find(
  (project) => project.id === selectedProjectId
)?.name;

const isFilteredProject = (selectedProjectId: string) => 
  filteredProjects.find((project) => project.id === selectedProjectId) !==
undefined



export const filterTasks = (tasks: Array<Task>, selectedProjectId: string): Array<Task> => {
  const isSelectedProjectIsAFilteredProject = isFilteredProject(selectedProjectId)
  const currentDate = new Date();
  
  if (!isSelectedProjectIsAFilteredProject) {
    return tasks.filter((task) => task.project_id === selectedProjectId)
  }
   else if (selectedProjectId === "today") {
      return tasks.filter(
        (task) => new Date(task.due_date as string).toDateString() === currentDate.toDateString())
    }
    else if(selectedProjectId === "tomorrow") {
      const tomorrowDate =  currentDate.setDate(currentDate.getDate() + 1);
      return tasks.filter(
        (task) => new Date(task.due_date as string).toDateString() === new Date(tomorrowDate).toDateString())
    
    }
    else if(selectedProjectId === "completed") {
     return  tasks.filter((task) => task.status === "Completed")
    }

    //selectedProject Id is "All"
    return tasks
}
    
