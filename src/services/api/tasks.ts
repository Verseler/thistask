import supabase from "../supabase/supabaseClient";

export const  getAllTasks = (userId: string) => supabase.from("tasks")
.select(`*,projects (*)`)
.eq("projects.user_id", userId);

export const getProjectTask = (projectId: string) => supabase.from("tasks")
.select()
.eq("project_id", projectId);