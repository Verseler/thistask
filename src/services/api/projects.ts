import supabase from "../supabase/supabaseClient"

export const getProjects = (userId: string) => supabase
.from("projects")
.select()
.eq("user_id", userId);

export const addProject = (name: string, userId: string) => supabase.from("projects").insert({ name, user_id: userId })

export const deleteProject = (projectId: string) => supabase.from("projects").delete().eq("id", projectId)