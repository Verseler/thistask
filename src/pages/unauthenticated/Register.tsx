import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PasswordInput from "@/components/ui/passwordInput";
import { useToast } from "@/components/ui/use-toast";
import { signup } from "@/services/api";
import BgImage from "@/assets/svg/startingScreenBg.svg";
import AppLogo from "@/components/common/AppLogo";
import FieldErrorMsg from "@/components/ui/FieldErrorMsg";

type RegisterForm = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const { toast } = useToast();
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [serverErrorMsg, setServerErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigate();

  const registerOptions = {
    email: { required: "Email is required" },
    first_name: { required: "First name is required" },
    last_name: { required: "Last name is required" },
    password: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must have at least 8 characters",
      },
      maxLength: {
        value: 20,
        message: "Password must have at most 20 characters",
      },
      validate: (value: string) =>
        value === confirmPassword || "Passwords do not match",
    },
  };

  const onSubmit: SubmitHandler<RegisterForm> = async (
    form: RegisterForm
  ): Promise<void> => {
    try {
      setServerErrorMsg("");
      setLoading(true);

      const { data, error } = await signup(form?.email, form?.password, {
        first_name: form?.first_name,
        last_name: form?.last_name,
      });

      if (error) {
        setServerErrorMsg(error.message);
        toast({
          title: error.message,
          description: "Please try again",
          variant: "destructive",
        });
        return;
      }

      if (data) {
        toast({
          title: "Registration Successful",
          description: "You have Successfully Registered. Please Login.",
        });
        navigation("/login");
      }
    } catch (err: unknown) {
      const error = err as Error;

      setServerErrorMsg("Error in Creating Account");
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

        <Card className="w-screen border-none shadow-none dark:bg-gray-900 md:max-w-xs md:dark:bg-gray-800 md:shadow-md">
          <CardHeader className="px-4 text-center md:px-6">
            <CardTitle className="text-4xl font-semibold md:text-3xl">
              Sign Up
            </CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <FieldErrorMsg error={serverErrorMsg} className="mb-2" />

            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              className="grid gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    id="first-name"
                    placeholder="John"
                    required
                    autoComplete="given-name"
                    disabled={loading}
                    hasError={!!errors.first_name}
                    {...register("first_name", registerOptions.first_name)}
                    className="dark:border-gray-600"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    id="last-name"
                    placeholder="Doe"
                    required
                    autoComplete="family-name"
                    disabled={loading}
                    hasError={!!errors.last_name}
                    {...register("last_name", registerOptions.last_name)}
                    className="dark:border-gray-600"
                  />
                </div>
                <FieldErrorMsg error={errors.first_name} />
                <FieldErrorMsg error={errors.last_name} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  autoComplete="email"
                  disabled={loading}
                  hasError={!!errors.email}
                  {...register("email", registerOptions.email)}
                  className="dark:border-gray-600"
                />
                <FieldErrorMsg error={errors.email} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput
                  id="password"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  hasError={!!errors.password}
                  {...register("password", registerOptions.password)}
                />
                <FieldErrorMsg error={errors.password} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <PasswordInput
                  id="confirmPassword"
                  required
                  autoComplete="new-password"
                  disabled={loading}
                  value={confirmPassword}
                  hasError={!!errors.password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <FieldErrorMsg error={errors.password} />
              </div>
              <Button disabled={loading} type="submit">
                Create an account
              </Button>
            </form>
            <div className="mt-4 text-center text-md md:text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Sign in
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

export default Register;
