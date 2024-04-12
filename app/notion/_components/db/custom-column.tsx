import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table//column-header";

import { NotionRowProps } from "./base-column";
import React from "react";
import {
  checkBoxCell,
  dateCell,
  fileCell,
  multiSelectCell,
  rawCell,
  selectCell,
  statusCell,
  timeCell,
  titleCell,
  urlCell,
} from "./cells";

/* Unsupported field types:
- "created_by"
- "formula"
- "last_edited_by"
- "people"
- "relation"
- "rollup"
*/

export function CustomColumn(dbProps: any): ColumnDef<NotionRowProps>[] {
  if (!dbProps) {
    return [];
  }
  const propertis = dbProps.properties as Record<string, any>;
  const columns: ColumnDef<NotionRowProps>[] = [];

  for (const key in propertis) {
    const value = propertis[key];
    if (!value) {
      continue;
    }
    switch (value?.type) {
      case "title":
      case "rich_text":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return titleCell(field[value?.type]);
          },
        });
        break;

      case "select":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return selectCell(field?.select);
          },
        });
        break;

      case "multi_select":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return multiSelectCell(field?.multi_select);
          },
        });
        break;

      case "checkbox":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return checkBoxCell(field?.checkbox);
          },
        });
        break;

      case "created_time":
      case "last_edited_time":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return timeCell(field[value?.type]);
          },
        });
        break;

      case "date":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return dateCell(field?.date);
          },
        });
        break;

      case "phone_number":
      case "email":
      case "number":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return rawCell(field[value?.type]);
          },
        });
        break;

      case "files":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return fileCell(field[value?.type]);
          },
        });
        break;

      case "url":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return urlCell(field[value?.type]);
          },
        });
        break;

      case "status":
        columns.push({
          accessorKey: key,
          header: ({ column }) => <DataTableColumnHeader column={column} title={value?.name} />,
          enableSorting: true,
          cell: ({ row }) => {
            const pros: any = row.original?.properties;
            const field = pros[key];
            return statusCell(field[value?.type]);
          },
        });
        break;

      default: // ignore other types
        console.log(`Unsupported column type ${value?.type}`);
        break;
    }
  }
  return columns;
}
