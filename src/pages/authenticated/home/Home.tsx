import {
  ClipboardList,
  CalendarArrowDown,
  CalendarArrowUp,
  CircleCheck,
} from "lucide-react";
import Sidebar from "@/components/home/sidebar/Sidebar.tsx";
import Header from "@/components/home/header/Header";
import { type FilteredProject } from "./home.types";
import TasksTable from "@/components/home/taskstable/TasksTable";
import { useState } from "react";
import TaskEditor from "@/components/home/taskeditor/TaskEditor";

export default function Home() {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [isTaskEditorVisible, setIsTaskEditorVisible] = useState(false);

  const toggleShowMobileSidebar = () =>
    setShowMobileSidebar(!showMobileSidebar);

  const hideTaskEditor = () => setIsTaskEditorVisible(false);
  const showTaskEditor = () => setIsTaskEditorVisible(true);

  return (
    <div className="flex h-[100svh] dark:bg-gray-900">
      <Sidebar
        showMobileSidebar={showMobileSidebar}
        toggleShowMobileSidebar={toggleShowMobileSidebar}
      />
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <Header toggleShowMobileSidebar={toggleShowMobileSidebar} />
        <main className="px-3 py-8 md:py-10 md:container md:px-5 lg:px-7">
          <TasksTable showTaskEditor={showTaskEditor} />
        </main>
      </div>

      <TaskEditor
        isVisible={isTaskEditorVisible}
        close={hideTaskEditor}
        hideTaskEditor={hideTaskEditor}
      />
    </div>
  );
}

export const filteredProjects: Array<FilteredProject> = [
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
