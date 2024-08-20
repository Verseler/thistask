import supabase from "../supabase/supabaseClient";

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

export default login;
