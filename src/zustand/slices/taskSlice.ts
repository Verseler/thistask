import type { Task } from "@/pages/authenticated/home/home.types";
import {StateCreator}  from "zustand"

export type TaskState = {
  tasks: Array<Task>,
  selectedTaskId: string | null,
  selectedTask: Task | null,
  setTasks: (tasks: Array<Task>) => void,
  setSelectedTaskId: (taskId: string) => void,
  clearSelectedTaskId: () => void
}

export const createTaskSlice: StateCreator<TaskState> = (set) => ({
  tasks: [],
  selectedTaskId: null,
  selectedTask: null,
  setTasks: (tasks: Array<Task>) => set({ tasks }),
  setSelectedTaskId: (taskId: string) => {
    set((state) =>({selectedTaskId: taskId, selectedTask: state.tasks.find((task) => task.id === taskId)}))
  },
  clearSelectedTaskId: () => {
    set({ selectedTaskId: null, selectedTask: null })
  },
})