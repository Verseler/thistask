import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { HTMLProps } from "react";

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClickConfirm: () => void;
  title?: string;
  desc?: string;
  confirmLabel?: string;
  confirmStyle?: HTMLProps<HTMLElement>["className"];
  cancelLabel?: string;
};

const ConfirmationDialog = ({
  open,
  setOpen,
  onClickConfirm,
  title,
  desc,
  confirmStyle,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dark:bg-gray-800 dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {desc ? desc : " This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-gray-200 dark:bg-gray-700">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={cn(
              "bg-primary-500 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-400 dark:text-white",
              confirmStyle
            )}
            onClick={onClickConfirm}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
