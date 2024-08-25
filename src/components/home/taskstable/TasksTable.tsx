import { useState } from "react";

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
import { type Task } from "@/pages/authenticated/home/home.types";
import TableFooter from "./TableFooter";
import TopHeader from "./TableHeader";
import { Skeleton } from "@/components/ui/skeleton";

type TasksTableProps = {
  tasks: Array<Task>;
  projectTitle: string;
  showTaskView: () => void;
  changeSelectedTaskId: (taskId: string) => void;
  loadingFetchingTask: boolean;
};

export default function TasksTable({
  tasks,
  projectTitle,
  showTaskView,
  changeSelectedTaskId,
  loadingFetchingTask,
}: TasksTableProps) {
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

  const handleShowTaskView = (taskId: string) => {
    showTaskView();
    changeSelectedTaskId(taskId);
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
        onClick={() => handleShowTaskView(row.original.id)}
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
        projectTitle={projectTitle}
        data={tasks}
        table={table}
        showTaskView={showTaskView}
      />
      <div className="border rounded-md dark:border-gray-700">
        <TableContainer>
          <TableHeader>{renderTableHeader}</TableHeader>

          <TableBody>
            {loadingFetchingTask ? renderSkeletonPlaceholder : renderTableBody}
          </TableBody>
        </TableContainer>
      </div>
      <TableFooter table={table} />
    </div>
  );
}
