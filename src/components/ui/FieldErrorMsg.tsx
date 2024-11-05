import { cn } from "@/lib/utils";
import * as React from "react";
import { FieldError } from "react-hook-form";

type FieldErrorMsgProps = {
  error: FieldError | string | undefined;
  className?: React.HTMLProps<HTMLElement>["className"];
  message?: string;
};

export default function FieldErrorMsg({
  error,
  className,
  message,
}: FieldErrorMsgProps) {
  if (!error) return;

  if (typeof error === "string") {
    return (
      <p className={cn("text-sm text-red-500 dark:text-red-400", className)}>
        {message || error}
      </p>
    );
  }

  return (
    <p className={cn("text-sm text-red-500 dark:text-red-400", className)}>
      {message || error.message}
    </p>
  );
}
