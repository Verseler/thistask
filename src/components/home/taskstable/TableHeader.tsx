import { Settings2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ProjectTitle from "@/components/home/taskstable/ProjectTitle";
import SearchBar from "@/components/home/taskstable/SearchBar";
import { Task } from "@/pages/authenticated/home/home.types";
import { Table } from "@tanstack/react-table";

type TopHeaderProps = {
  projectTitle: string;
  data: Array<Task>;
  table: Table<Task>;
  showTaskEditor: () => void;
};

export default function TopHeader({
  projectTitle,
  data,
  table,
  showTaskEditor,
}: TopHeaderProps) {
  const renderColumnFilterOptions = table
    .getAllColumns()
    .filter((column) => column.getCanHide())
    .map((column) => {
      return (
        <DropdownMenuCheckboxItem
          key={column.id}
          className="capitalize "
          checked={column.getIsVisible()}
          onCheckedChange={(value) => column.toggleVisibility(!!value)}
        >
          {column.id}
        </DropdownMenuCheckboxItem>
      );
    });

  return (
    <div className="flex flex-col justify-between py-4 gap-y-4 xl:gap-y-0 xl:items-center xl:flex-row">
      <ProjectTitle count={data?.length}>{projectTitle}</ProjectTitle>
      <div className="flex items-center gap-x-2">
        <SearchBar table={table} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-transparent ps-3 pe-1 md:pe-4 dark:bg-transparent dark:border-gray-700 dark:text-gray-400"
            >
              <Settings2 className="mr-2 md:size-4" />
              <span className="hidden md:block">Columns</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-gray-700">
            {renderColumnFilterOptions}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={showTaskEditor}>
          <Plus className="md:mr-2 md:size-4" />
          <span className="hidden md:block">Add task</span>
        </Button>
      </div>
    </div>
  );
}
