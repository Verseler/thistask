import supabase from "../supabase/supabaseClient";

type TAdditionalData = {
  first_name: string;
  last_name: string
}

const signup = (email: string, password: string, data: TAdditionalData) =>
  supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: data,
    },
  });

  export default signup