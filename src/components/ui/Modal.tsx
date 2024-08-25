import { cn } from "@/lib/utils";
import React, { HTMLProps } from "react";

type CommonProps = {
  children: React.ReactNode;
  className?: HTMLProps<HTMLElement>["className"];
};

type ModalProps = CommonProps & {
  open: boolean;
};

export function Modal({ children, className, open }: ModalProps) {
  if (!open) return;

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 md:flex md:items-center md:p-10 bg-black/30 ",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ModalContent({ children, className }: CommonProps) {
  return (
    <div
      className={cn(
        "w-full md:max-w-3xl md:mx-auto h-full md:h-auto flex flex-col bg-white md:rounded-lg shadow-lg dark:bg-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ModalHeader({ children, className }: CommonProps) {
  return (
    <div
      className={cn(
        "flex justify-end p-2 border-b dark:border-gray-700  gap-x-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ModalBody({ children, className }: CommonProps) {
  return <div className={cn("", className)}>{children}</div>;
}
