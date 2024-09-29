import { useEffect, useState } from "react";

import {
  type ColumnFilter,
  type ColumnSort,
  type Table,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table as TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import columns from "./columns";
import { Project, type Task } from "@/pages/authenticated/home/home.types";
import TableFooter from "./TableFooter";
import TopHeader from "./TableHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getAllTasks } from "@/services/api/tasks";
import { useAuth } from "@/context/AuthProvider/AuthProvider";
import { useBoundStore } from "@/zustand/useBoundStore";
import { filteredProjects } from "@/pages/authenticated/home/Home";
import { getProjectName } from "./taskstable.helper";
import { toast } from "@/components/ui/use-toast";

type TasksTableProps = {
  showTaskEditor: () => void;
};

export default function TasksTable({ showTaskEditor }: TasksTableProps) {
  const { user } = useAuth();
  const setTasks = useBoundStore((state) => state.setTasks);
  const {
    data = [],
    isLoading,
    error,
  } = useQuery(getAllTasks(user!.id), {
    refetchInterval: 1000,
  });
  const tasks = data as Array<Task>;

  //set fetched projects to global projects state
  useEffect(() => {
    setTasks(tasks);
  }, [data]);

  if (error) {
    toast({
      title: "Error: Unable to get tasks",
      description: error.message,
    });
  }

  const setSelectedTaskId = useBoundStore((state) => state.setSelectedTaskId);
  const projects = useBoundStore((state) => state.projects);
  const mergedProjects = [...filteredProjects, ...projects] as Array<Project>;
  const selectedProjectId = useBoundStore((state) => state.selectedProjectId);

  const projectName: string =
    getProjectName(mergedProjects, selectedProjectId) ?? "All";

  [...filteredProjects, ...projects].find(
    (project) => project.id === selectedProjectId
  )?.name || filteredProjects[0].name;

  const [sorting, setSorting] = useState<Array<ColumnSort>>([]);
  const [columnFilters, setColumnFilters] = useState<Array<ColumnFilter>>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const table: Table<Task> = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleShowTaskEditor = (taskId: string) => {
    showTaskEditor();
    setSelectedTaskId(taskId);
  };

  /*
   *
   * Render UI
   *
   */
  const renderTableHeader = table.getHeaderGroups().map((headerGroup) => (
    <TableRow key={headerGroup.id} className="text-base dark:border-gray-700">
      {headerGroup.headers.map((header) => {
        return (
          <TableHead key={header.id}>
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </TableHead>
        );
      })}
    </TableRow>
  ));

  const renderTableBody = table.getRowModel().rows?.length ? (
    table.getRowModel().rows.map((row) => (
      <TableRow
        key={row.id}
        data-state={row.getIsSelected() && "selected"}
        onClick={() => handleShowTaskEditor(row.original.id)}
        className="h-12 md:h-auto dark:text-gray-300 dark:border-gray-700"
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="h-8 text-center dark:text-gray-400"
      >
        No results.
      </TableCell>
    </TableRow>
  );

  const renderSkeletonPlaceholder = (
    <TableRow>
      {columns.map((column, index) => (
        <TableCell key={column.id + " " + index}>
          <Skeleton className="w-full h-4" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="w-full px-4 bg-white border border-gray-200 rounded-lg md:px-6 dark:bg-gray-800 dark:border-gray-700">
      <TopHeader
        projectName={projectName}
        data={tasks}
        table={table}
        showTaskEditor={showTaskEditor}
      />
      <div className="border rounded-md dark:border-gray-700">
        <TableContainer>
          <TableHeader>{renderTableHeader}</TableHeader>

          <TableBody>
            {isLoading ? renderSkeletonPlaceholder : renderTableBody}
          </TableBody>
        </TableContainer>
      </div>
      <TableFooter table={table} />
    </div>
  );
}
