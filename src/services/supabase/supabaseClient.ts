import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

const supabaseUrl = "https://aclkbvuxyxhxjskhihsc.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY as string;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
