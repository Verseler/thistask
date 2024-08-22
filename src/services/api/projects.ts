import supabase from "../supabase/supabaseClient"

export const getProjects = (userId: string) => supabase
.from("projects")
.select()
.eq("user_id", userId);