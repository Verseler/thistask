import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  CircleDashed,
  CircleCheck,
  LoaderCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { type Task } from "@/pages/authenticated/home/home.types";
import { getDate, getTime } from "@/lib/utils";

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-semibold lowercase min-w-14 max-h-10">
        {row.getValue<string>("name")}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="flex-grow overflow-hidden capitalize max-h-10">
        {row.getValue<string>("description")}
      </div>
    ),
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-base md:text-sm"
        >
          Due Date
          <ArrowUpDown className="ml-2 size-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const timestamp: string = row.getValue<string>("due_date");
      const dueDate = timestamp ? getDate(timestamp) : "";
      return <div className="capitalize min-w-24 ps-4">{dueDate}</div>;
    },
  },
  {
    accessorKey: "dueTime",
    header: "Due Time",
    cell: ({ row }) => {
      const timestamp: string = row.getValue<string>("due_date");
      const dueTime = timestamp ? getTime(timestamp) : "";
      return <div className="capitalize min-w-24">{dueTime}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusIcon: Record<Task["status"], JSX.Element> = {
        Pending: <CircleDashed size={14} />,
        "In Progress": <LoaderCircle size={14} />,
        Completed: <CircleCheck size={14} />,
      };

      return (
        <div className="flex items-center">
          <div className="w-5">
            {statusIcon[row.getValue<Task["status"]>("status")]}
          </div>
          <div className="capitalize">
            {row.getValue<Task["status"]>("status")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priorityIcon: Record<Task["priority"], JSX.Element> = {
        Low: <ArrowUp size={14} />,
        Medium: <ArrowRight size={14} />,
        High: <ArrowDown size={14} />,
      };

      return (
        <div className="flex items-center">
          <div className="w-5">
            {priorityIcon[row.getValue<Task["priority"]>("priority")]}
          </div>
          <div className="capitalize">
            {row.getValue<Task["priority"]>("priority")}
          </div>
        </div>
      );
    },
  },
];

export default columns;
