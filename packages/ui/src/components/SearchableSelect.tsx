"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./Command";
import { Button } from "@pipu/ui/components";
import { cn } from "@pipu/ui/lib/utils";

interface SearchableProps {
  items: { label: string; value: any }[] | undefined;
  placeholder: string;
  field: ControllerRenderProps<any, any>;
  isSearching: boolean;
  onSearch: (search: string) => void;
}

export function SearchableSelect({
  placeholder,
  field,
  items = [],
  isSearching,
  onSearch,
}: SearchableProps) {
  const [selectedItem, setSelectedItem] = useState<{
    label: string;
    value: string | number | Date;
  }>();
  const [open, setOpen] = useState(false);

  const debouncedSearch = debounce((query: string) => {
    onSearch(query);
  }, 500);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (search: string) => {
    debouncedSearch(search);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between py-5"
        >
          {selectedItem ? selectedItem.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
            onValueChange={handleSearchChange}
          />
          <CommandList>
            {isSearching ? (
              <CommandEmpty>Searching...</CommandEmpty>
            ) : items.length === 0 ? (
              <CommandEmpty>No items found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue: string) => {
                      field.onChange(
                        currentValue === field.value ? "" : currentValue,
                      );
                      setSelectedItem({ label: item.label, value: item.value });
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === item.value
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
