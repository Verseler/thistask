import { AuthTokenResponsePassword, User as SBUser, AuthError } from "@supabase/supabase-js";

export type User = SBUser 

export type TAuthContext = {
  user: User | null;
  auth: boolean;
  login: (email: string, password: string) => Promise<AuthTokenResponsePassword>
  logout: () => Promise<{error: AuthError | null}>;
}

export type AuthProviderProps = {
  children: React.ReactNode;
}


