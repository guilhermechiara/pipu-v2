"use client";

import { useState } from "react";
import { SearchableSelect } from "@pipu/ui/components";
import { ControllerRenderProps } from "react-hook-form";
import { Chapter } from "../types/chapter";
import { useChaptersSelectQuery } from "../hooks/useChaptersSelectQuery";

interface ChaptersSelectProps {
  field: ControllerRenderProps<any, any>;
}

export const ChaptersSelect = ({ field }: ChaptersSelectProps) => {
  const [query, setQuery] = useState<string>();
  const { data, isLoading } = useChaptersSelectQuery({ search: query });

  return (
    <SearchableSelect
      field={field}
      items={data?.data.map((chapter: Chapter) => ({
        label: chapter.name,
        value: chapter.id,
      }))}
      isSearching={isLoading}
      onSearch={(value: string) => setQuery(value)}
      placeholder="Selecione um chapter"
    />
  );
};
