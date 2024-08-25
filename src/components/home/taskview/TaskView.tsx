import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  ArrowUp,
  ArrowRight,
  CircleDashed,
  CircleCheck,
  LoaderCircle,
  CornerDownLeft,
  Hash,
} from "lucide-react";
import SelectItemOption from "./SelectItemOption";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/textarea";

import { useEffect, useState } from "react";
import { Project, Task } from "@/pages/authenticated/home/home.types";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { upsertTask } from "@/services/api/tasks";
import TaskViewHeader from "./TaskViewHeader";

type TaskViewProps = {
  projects: Array<Project>;
  isVisible: boolean;
  close: () => void;
  selectedTask: Task | null;
  clearSelectedTaskId: () => void;
  hideTaskView: () => void;
  refetchTasks: () => Promise<void>;
};

export default function TaskView({
  projects,
  isVisible,
  close,
  selectedTask,
  clearSelectedTaskId,
  hideTaskView,
  refetchTasks,
}: TaskViewProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Task>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Task> = async (data): Promise<void> => {
    try {
      setLoading(true);

      const { error } = await upsertTask(
        selectedTask?.id,
        data.name,
        data.description,
        data.status,
        data.priority,
        data.due_date,
        data.project_id
      );

      if (error) {
        toast({
          title: error.message,
          variant: "destructive",
        });
        return;
      } else {
        refetchTasks();
        toast({
          title: `Task ${selectedTask?.id ? "updated" : "added"} successfully`,
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
      hideTaskView();
    }
  };

  // Reset form values whenever selectedTask changes
  useEffect(() => {
    reset({
      project_id: selectedTask?.project_id,
      name: selectedTask?.name,
      description: selectedTask?.description,
      status: selectedTask?.status,
      priority: selectedTask?.priority,
      due_date: selectedTask?.due_date,
    });
  }, [selectedTask, reset]);

  //clear form when exiting task view
  useEffect(() => {
    if (!isVisible) {
      reset({
        project_id: undefined,
        name: undefined,
        description: null,
        status: undefined,
        priority: undefined,
        due_date: null,
      });

      clearSelectedTaskId();
    }
  }, [isVisible, reset]);

  //handle keyboard escape keyboard key event
  useEffect(() => {
    const exitTaskView = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    document.addEventListener("keydown", exitTaskView);

    return () => document.removeEventListener("keydown", exitTaskView);
  }, []);

  return (
    <Modal open={isVisible}>
      <ModalContent>
        <ModalHeader>
          <TaskViewHeader
            close={close}
            selectedTaskId={selectedTask?.id}
            refetchTasks={refetchTasks}
          />
        </ModalHeader>

        <ModalBody className="h-full md:h-auto">
          <form
            className="flex flex-col h-full md:flex-row"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col flex-1 pt-2 border-b md:h-96 md:border-e md:border-b-0 dark:border-gray-700">
              <Label htmlFor="name" className="sr-only">
                Task Name
              </Label>
              <Controller
                control={control}
                name="name"
                rules={{ required: true, maxLength: 50 }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="name"
                    required
                    className="font-semibold border-none shadow-none focus-visible:ring-0 dark:text-white"
                    autoComplete="off"
                    placeholder="Task Name"
                    maxLength={50}
                    onChange={onChange}
                    value={value || ""}
                  />
                )}
              />

              {errors.name && (
                <p className="text-sm text-red-500 ms-3">Name is required</p>
              )}

              <Controller
                control={control}
                name="description"
                rules={{ maxLength: 250 }}
                render={({ field: { onChange, value } }) => (
                  <Textarea
                    id="description"
                    className="flex-1 text-base border-none shadow-none resize-none md:text-sm focus-visible:ring-0 dark:text-gray-200"
                    placeholder="Type your task description..."
                    maxLength={250}
                    onChange={onChange}
                    value={value || ""}
                  />
                )}
              />
            </div>

            <div className="flex flex-col w-full p-4 md:w-72">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="project">Project</Label>
                  <Controller
                    control={control}
                    name="project_id"
                    rules={{ required: true }}
                    defaultValue={projects[0]?.id}
                    render={({ field: { onChange, value } }) => {
                      const selectPlaceholder =
                        projects.length === 0
                          ? "No projects"
                          : "Select a project";

                      const renderProjectSelectItems = projects.map(
                        (project) => (
                          <SelectItemOption
                            key={project.id}
                            value={project.id}
                            name={project.name as string}
                            icon={<Hash size={14} />}
                          />
                        )
                      );

                      return (
                        <Select
                          onValueChange={onChange}
                          value={value as string}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder={selectPlaceholder} />
                          </SelectTrigger>

                          <SelectContent>
                            {projects.length === 0 ? (
                              <Button type="button" className="w-full">
                                Create New Project
                              </Button>
                            ) : (
                              renderProjectSelectItems
                            )}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="due_date">Due Date</Label>
                  <input
                    className="px-3 py-1.5 md:text-sm border h-12 text-base md:h-9 bg-white border-gray-200 rounded-md cursor-pointer w-full focus-visible:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                    aria-label="Date and time"
                    type="datetime-local"
                    placeholder="Select date and time"
                    {...register("due_date")}
                  />
                </div>

                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Controller
                    control={control}
                    name="priority"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Select onValueChange={onChange} value={value || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItemOption
                              value="Low"
                              icon={<ArrowDown size={14} />}
                            />
                            <SelectItemOption
                              value="Medium"
                              icon={<ArrowRight size={14} />}
                            />
                            <SelectItemOption
                              value="High"
                              icon={<ArrowUp size={14} />}
                            />
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, value } }) => {
                      return (
                        <Select onValueChange={onChange} value={value || ""}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItemOption
                              value="Pending"
                              icon={<CircleDashed size={14} />}
                            />
                            <SelectItemOption
                              value="In Progress"
                              icon={<LoaderCircle size={14} />}
                            />
                            <SelectItemOption
                              value="Completed"
                              icon={<CircleCheck size={14} />}
                            />
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>
              </div>

              <div className="flex items-end justify-end flex-1 mt-10 md:mt-7">
                <Button
                  type="submit"
                  className="gap-1.5 w-full md:w-auto text-base md:text-sm"
                  disabled={loading}
                >
                  Save Task
                  <CornerDownLeft className="size-5 md:size-3.5" />
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
