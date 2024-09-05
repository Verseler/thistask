import { Task } from "@/pages/authenticated/home/home.types";
import supabase from "../supabase/supabaseClient";

export const  getAllTasks = (userId: string) => supabase.from("tasks")
.select(`*,projects (*)`)
.eq("projects.user_id", userId);

export const getProjectTasks = (projectId: string) => supabase.from("tasks")
.select()
.eq("project_id", projectId);

export const deleteTask  = (projectId: string) => supabase.from("tasks").delete().eq("id", projectId)

export const upsertTask = async ( 
  id: string | undefined, 
  name: string, 
  description: string | null, 
  status: Task["status"] | null, 
  priority: 
  Task["priority"] | null, 
  due_date: string | null, 
  project_id: string,) => {
    if(id) {
      return supabase.from("tasks").update({
        name,
        description,
        status,
        priority,
        due_date,
        project_id,
      }).eq("id", id);
    }

    return supabase.from("tasks").insert({
      name,
      description,
      status,
      priority,
      due_date,
      project_id,
    });
}