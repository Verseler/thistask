import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";

import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PasswordInput from "@/components/ui/passwordInput";
import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BgImage from "@/assets/svg/startingScreenBg.svg";
import AppLogo from "@/components/common/AppLogo";

type LoginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const [serverErrorMsg, setServerErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const registerOptions = {
    email: { required: "Email is required" },
    password: { required: "Password is required" },
  };

  const onSubmit: SubmitHandler<LoginForm> = async (form): Promise<void> => {
    try {
      setServerErrorMsg("");
      setLoading(true);

      const {
        data: { user, session },
        error,
      } = await login(form?.email, form?.password);

      if (error) {
        setServerErrorMsg(error.message);
        toast({
          title: error.message,
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }

      if (user && session) navigate("/");
    } catch (err: unknown) {
      const error = err as Error;

      setServerErrorMsg("Email or Password is incorrect");
      toast({ title: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:container md:ps-20 flex items-center h-[100dvh] dark:bg-gray-900">
      <div className="space-y-12">
        <header className="hidden md:block">
          <AppLogo />
        </header>

        <Card className="w-screen border-none shadow-none md:max-w-xs dark:bg-gray-900 md:shadow-md">
          <CardHeader className="px-4 text-center md:px-6">
            <CardTitle className="text-4xl font-semibold md:text-3xl">
              Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            {serverErrorMsg && (
              <div className="mb-2 text-center text-red-500">
                {serverErrorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  {...register("email", registerOptions.email)}
                  type="email"
                  required
                  placeholder="m@example.com"
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link
                href="#"
                className="inline-block ml-auto text-sm underline"
              >
                Forgot your password?
              </Link> */}
                </div>
                <PasswordInput
                  id="password"
                  {...register("password", registerOptions.password)}
                  required
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={loading}>
                Login
              </Button>
            </form>

            <div className="mt-4 text-center text-md md:text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <img
        src={BgImage}
        alt="task background image illustration"
        className="hidden size-9/12 md:block"
      />
    </div>
  );
}
