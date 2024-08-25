import {
  ClipboardList,
  CalendarArrowDown,
  CalendarArrowUp,
  CircleCheck,
} from "lucide-react";
import Sidebar from "@/components/home/sidebar";
import Header from "@/components/home/header";
import { type FilteredProject } from "./home.types";
import useProjects from "@/hooks/useProjects";
import useTasks from "@/hooks/useTasks";
import TasksTable from "@/components/home/taskstable";
import { useState } from "react";
import TaskView from "@/components/home/taskview";

export default function Home() {
  const {
    projects,
    changeSelectedProjectId,
    selectedProjectId,
    refetchProjects,
  } = useProjects(filteredProjects);
  const {
    tasks,
    refetchTasks,
    loadingFetchingTask,
    changeSelectedTaskId,
    selectedTask,
    clearSelectedTaskId,
  } = useTasks(filteredProjects, selectedProjectId);
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(false);
  const [isTaskViewVisible, setIsTaskViewVisible] = useState<boolean>(false);

  const toggleShowMobileSidebar = () =>
    setShowMobileSidebar(!showMobileSidebar);

  const hideTaskView = () => setIsTaskViewVisible(false);
  const showTaskView = () => setIsTaskViewVisible(true);

  const selectedProjectTitle: string =
    [...filteredProjects, ...projects].find(
      (project) => project.id === selectedProjectId
    )?.name || filteredProjects[0].name;

  return (
    <div className="flex h-[100svh] dark:bg-gray-900">
      <Sidebar
        selectedProjectId={selectedProjectId}
        filteredProjects={filteredProjects}
        projects={projects}
        refetchProjects={refetchProjects}
        changeSelectedProjectId={changeSelectedProjectId}
        showMobileSidebar={showMobileSidebar}
        toggleShowMobileSidebar={toggleShowMobileSidebar}
      />

      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Header toggleShowMobileSidebar={toggleShowMobileSidebar} />
        <main className="px-3 py-8 md:py-10 md:container md:px-5 lg:px-7">
          <TasksTable
            projectTitle={selectedProjectTitle}
            tasks={tasks}
            showTaskView={showTaskView}
            changeSelectedTaskId={changeSelectedTaskId}
            loadingFetchingTask={loadingFetchingTask}
          />
        </main>
      </div>

      <TaskView
        isVisible={isTaskViewVisible}
        close={hideTaskView}
        selectedTask={selectedTask}
        clearSelectedTaskId={clearSelectedTaskId}
        projects={projects}
        hideTaskView={hideTaskView}
        refetchTasks={refetchTasks}
      />
    </div>
  );
}

const filteredProjects: Array<FilteredProject> = [
  {
    id: "all",
    name: "All",
    icon: <ClipboardList className="mr-3 md:mr-2 md:size-4" />,
  },
  {
    id: "today",
    name: "Today",
    icon: <CalendarArrowDown className="mr-3 md:mr-2 md:size-4" />,
  },
  {
    id: "tomorrow",
    name: "Tomorrow",
    icon: <CalendarArrowUp className="mr-3 md:mr-2 md:size-4" />,
  },
  {
    id: "completed",
    name: "Completed",
    icon: <CircleCheck className="mr-3 md:mr-2 md:size-4" />,
  },
];
