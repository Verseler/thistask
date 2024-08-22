import { Button } from "@/components/ui/button";
import { Task } from "@/pages/authenticated/home/home.types";
import { Table } from "@tanstack/react-table";

type TableFooterProps = {
  table: Table<Task>;
};

export default function TableFooter({ table }: TableFooterProps) {
  return (
    <div className="flex items-center justify-end py-4 space-x-2">
      <div className="space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.previousPage()}
          disabled={!table?.getCanPreviousPage()}
          className="p-5 bg-white md:p-3 text-md md:text-xs dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:border-gray-700"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table?.nextPage()}
          disabled={!table?.getCanNextPage()}
          className="p-5 bg-white md:p-3 text-md md:text-xs dark:bg-transparent dark:text-white dark:hover:bg-white/10 dark:border-gray-700"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
