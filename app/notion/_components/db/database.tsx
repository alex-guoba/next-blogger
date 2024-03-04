"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { DataTable } from "@/components/ui/data-table/database-table";
import { BaseColumn } from "./base-column";
import { CustomColumn } from "./custom-column";

interface DatabaseRendererProps {
  property: any;
  data: any;
  className?: string | undefined;
}

export function DatabaseRenderer({ property, data, className }: DatabaseRendererProps) {
  const base = BaseColumn();
  const custom = CustomColumn(property);

  const columns: ColumnDef<any>[] = [...base, ...custom];
  //   console.log(columns);

  const rows = data || [];

  return (
    <div className={cn(className, "w-full max-w-full")}>
      <DataTable columns={columns} data={rows}></DataTable>
    </div>
  );
}
