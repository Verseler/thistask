import { Tables } from "@/services/supabase/database.types";

export type FilteredProject = {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export type Project = Tables<"projects">


export type Task = Omit<Tables<"tasks">,  "status" | "priority">  & {
  status: "Pending" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High"
}