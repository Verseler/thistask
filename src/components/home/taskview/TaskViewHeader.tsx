import { X, EllipsisVertical } from "lucide-react";
import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteTask } from "@/services/api/tasks";
import { toast } from "@/components/ui/use-toast";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";

type TaskViewHeaderProps = {
  close: () => void;
  selectedTaskId: string | undefined;
  refetchTasks: () => Promise<void>;
};

function TaskViewHeader({
  close,
  selectedTaskId,
  refetchTasks,
}: TaskViewHeaderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const showDeleteDialog = () => setIsDialogOpen(true);
  const hideDeleteDialog = () => setIsDialogOpen(false);

  const onSubmit = async () => {
    try {
      setLoading(true);

      if (!selectedTaskId) {
        throw new Error("No task selected");
      }

      const { error } = await deleteTask(selectedTaskId);

      if (error) {
        toast({
          title: "Error: Unable to delete task",
          description: error.message,
          variant: "destructive",
        });
        return;
      } else {
        refetchTasks();
        toast({
          title: "Task deleted successfully",
          duration: 1500,
        });
      }
    } catch (err: unknown) {
      const error = err as Error;
      toast({
        title: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      hideDeleteDialog();
      close();
    }
  };

  return (
    <>
      {selectedTaskId && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="text-gray-500 hover:dark:bg-gray-700"
            >
              <EllipsisVertical className="size-8 md:size-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-36 dark:bg-gray-800 dark:border-gray-700">
            <DropdownMenuLabel className="font-medium text-gray-400 dark:text-gray-600 ">
              More Options
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="dark:bg-gray-700" />
            <DropdownMenuItem
              onClick={showDeleteDialog}
              className="text-red-500 cursor-pointer"
              disabled={loading}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Button
        size="icon"
        variant="ghost"
        className="text-gray-500 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white"
        onClick={close}
      >
        <X className="size-8 md:size-5" />
      </Button>
      <ConfirmationDialog
        open={isDialogOpen}
        setOpen={setIsDialogOpen}
        onClickConfirm={onSubmit}
      />
    </>
  );
}

export default TaskViewHeader;
