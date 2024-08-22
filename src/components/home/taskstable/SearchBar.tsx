import { useState } from "react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Task } from "@/pages/authenticated/home/home.types";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  table: Table<Task>;
};

const SearchBar = ({ table }: SearchBarProps) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    table.getColumn("name")?.setFilterValue(event.target.value);
  };

  return (
    <div
      className={cn(
        "relative flex items-center flex-1 h-12 border rounded-md shadow-sm md:h-9 lg:flex-0 dark:border-gray-700 peer-focus-visible:ring-4"
      )}
    >
      <Search
        className="w-12 text-gray-400 md:w-8 dark:text-gray-400"
        size={18}
      />
      <Input
        placeholder="Filter names..."
        value={searchValue}
        onChange={handleInputChange}
        className="p-0 bg-transparent border-none shadow-none focus-visible:ring-0 peer md:max-w-36 dark:placeholder:text-gray-400 dark:text-white"
      />
    </div>
  );
};

export default SearchBar;
