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

type ConfirmationDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClickConfirm: () => void;
  title?: string;
  desc?: string;
};

const ConfirmationDialog = ({
  open,
  setOpen,
  onClickConfirm,
  title,
  desc,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dark:bg-gray-800 dark:text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title ? title : "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {desc
              ? desc
              : " This action cannot be undone. This will permanently delete your   account and remove your data from our servers."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:text-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-primary-500 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-400 dark:text-white"
            onClick={onClickConfirm}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
