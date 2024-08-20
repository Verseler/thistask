import supabase from "../supabase/supabaseClient";

const logout = () => supabase.auth.signOut();

export default logout