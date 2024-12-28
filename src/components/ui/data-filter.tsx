import React from "react";
import { Search } from "lucide-react";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface FilterOption {
  value: string;
  label: string;
}

interface DataFilterProps {
  searchPlaceholder?: string;
  filters?: {
    name: string;
    options: FilterOption[];
  }[];
  onSearchChange?: (value: string) => void;
  onFilterChange?: (filter: string, value: string) => void;
}

const DataFilter = ({
  searchPlaceholder = "Search...",
  filters = [],
  onSearchChange,
  onFilterChange,
}: DataFilterProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          className="pl-8"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      {filters.map((filter) => (
        <Select
          key={filter.name}
          onValueChange={(value) => onFilterChange?.(filter.name, value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={filter.name} />
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
};

export default DataFilter;
