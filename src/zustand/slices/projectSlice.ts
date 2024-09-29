import type { Project } from "@/pages/authenticated/home/home.types";
import {StateCreator} from "zustand"

export type ProjectState = {
  projects: Array<Project>,
  setProjects: (projects: Array<Project>) => void,
  selectedProjectId: string,
  setSelectedProjectId: (projectId: string) => void
}

export const createProjectSlice: StateCreator<ProjectState> = (set) => ({
  projects: [],
  setProjects: (projects: Array<Project>) => set({ projects }),
  selectedProjectId: "all",
  setSelectedProjectId: (projectId: string) => set({ selectedProjectId: projectId }),
})