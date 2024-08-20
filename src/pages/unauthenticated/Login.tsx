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
import AppIcon from "@/assets/images/logo/appIcon.png";

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

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      setServerErrorMsg("");
      setLoading(true);

      const {
        data: { user, session },
        error,
      } = await login(data?.email, data?.password);

      if (error) {
        setServerErrorMsg(error.message);
        toast({
          title: error.message,
          description: "Please try again",
          variant: "destructive",
        });
      }

      if (user && session) navigate("/");
    } catch (err: unknown) {
      const error = err as Error;

      setServerErrorMsg("Email or Password is incorrect");
      toast({
        title: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:container md:ps-20 h-[100dvh] dark:bg-gray-900">
      <header className="absolute items-center hidden h-20 md:top-12 md:flex gap-x-2">
        <img src={AppIcon} alt="app logo" className="size-10" />
        <span
          aria-label="app title"
          className="hidden text-2xl font-medium md:inline"
        >
          <span className="text-primary-500">This</span>Task
        </span>
      </header>

      <div className="flex items-center h-full">
        <Card className="w-full border-none shadow-none md:max-w-xs dark:bg-gray-800 md:shadow-md">
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

        <img
          src={BgImage}
          alt="task background image illustration"
          className="hidden size-9/12 md:block"
        />
      </div>
    </div>
  );
}
