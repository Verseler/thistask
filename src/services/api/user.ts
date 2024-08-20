import supabase from "../supabase/supabaseClient";

type setUser = (user: any) => any;
type setLoading = (loading: boolean) => void;

const getUser = async (setUser: setUser, setLoading: setLoading) => {
  const { data } = await supabase.auth.getUser();

  const { user: currentUser } = data;
  setUser(currentUser ?? null);
  setLoading(false);
}

export {getUser}