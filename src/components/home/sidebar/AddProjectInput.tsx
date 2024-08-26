import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HTMLProps, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

type AddProjectInputProps = {
  onAddProject: (projectName: string) => Promise<void>;
  className?: HTMLProps<HTMLElement>["className"];
};

export default function AddProjectInput({
  onAddProject,
  className,
}: AddProjectInputProps) {
  const [projectName, setProjectName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (!projectName) return;

      onAddProject(projectName);
    } catch (err) {
      const error = err as Error;

      toast({
        title: error.message,
        variant: "destructive",
      });
    } finally {
      setProjectName("");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex items-center border rounded-md md:py-0 dark:border-gray-700 focus-within:ring-1 focus-within:ring-ring focus-within:ring-black dark:focus-within:ring-gray-400 dark:bg-gray-800",
        className
      )}
    >
      <Input
        placeholder="Add Project"
        className="border-none shadow-none focus-visible:ring-0 dark:text-white"
        value={projectName}
        maxLength={18}
        onChange={(e) => setProjectName(e.target.value)}
        disabled={loading}
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="w-16 rounded-none md:w-12 border-s-0"
        disabled={loading}
      >
        <Plus className="text-gray-500 size-8 md:size-6" />
      </Button>
    </form>
  );
}
