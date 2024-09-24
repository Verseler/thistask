import { forwardRef, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type PasswordInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, hasError, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative dark:border-gray-600">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder=" "
          hasError={hasError}
          className={cn("hide-password-toggle pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute top-0 z-10 h-full px-3 py-2 right-1 md:right-0 hover:bg-transparent"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <EyeIcon
              className="text-gray-500 size-5 md:size-4 dark:text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <EyeOffIcon
              className="text-gray-500 size-5 md:size-4 dark:text-gray-400"
              aria-hidden="true"
            />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    );
  }
);

export default PasswordInput;
