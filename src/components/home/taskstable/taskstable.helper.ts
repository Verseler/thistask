import { Project } from "@/pages/authenticated/home/home.types"

export const getProjectName = (projects: Array<Project>, selectedProjectId: string) => projects.find(
  (project) => project.id === selectedProjectId
)?.name;