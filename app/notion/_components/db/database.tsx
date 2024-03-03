"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { DataBaseTable } from "./database-table";
import { BasicColumn } from "./basic-columns";
import { PropertiesColumn } from "./property-columns";

interface DatabaseRendererProps {
  property: any;
  data: any;
  className?: string | undefined;
}

export function DatabaseRenderer({ property, data, className }: DatabaseRendererProps) {
  const baisc = BasicColumn();
  const extended = PropertiesColumn(property);

  const columns: ColumnDef<any>[] = [...baisc, ...extended];
  //   console.log(columns);

  const rows = data || [];

  return (
    <div className={cn(className, "w-full max-w-full")}>
      <DataBaseTable columns={columns} data={rows}></DataBaseTable>
    </div>
  );
}
