import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/column-header";
import { formatDate } from "@/lib/utils";

export type NotionRowProps = {
  id: string;
  create_time: string;
  last_edited_time: string;
  icon: null | string;
  url: string;

  properties: Map<string, object>;
};

export function BaseColumn(): ColumnDef<NotionRowProps>[] {
  const columns: ColumnDef<NotionRowProps>[] = [
    {
      id: "__rows_selected",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className=""
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
      enableSorting: false,
    },
    {
      accessorKey: "created_time",
      header: ({ column }) => <DataTableColumnHeader column={column} title="CreatedTime" />,
      cell: ({ row }) => {
        const value: any = row.getValue("created_time");
        return <span>{formatDate(value)}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "last_edited_time",
      header: ({ column }) => <DataTableColumnHeader column={column} title="LastEditTime" />,
      cell: ({ row }) => {
        const value: any = row.getValue("last_edited_time");
        return <span>{formatDate(value)}</span>;
      },
      enableSorting: true,
      enableHiding: true,
    },
    {
      accessorKey: "icon",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Icon" />,
      cell: ({ row }) => {
        const value: any = row.getValue("icon");
        if (!value) {
          return null;
        }
        const { type, emoji, external, file } = value;
        if (type == "emoji") {
          return <div className="h-6 w-6 self-start text-xl leading-[1em]">{emoji}</div>;
        }
        const url = external?.url || file?.url;
        if (!url) {
          return null;
        }
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={url}
            className="h-6 w-6 self-start text-[1em] leading-[1em]"
            loading="lazy"
            decoding="async"
            alt="external icon"
          />
        );
      },
    },
    // {
    //   accessorKey: "url",
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="URL" />,
    //   cell: ({ row }) => {
    //     const value: any = row.getValue("url");
    //     return <span className="whitespace-pre-wrap">{value}</span>;
    //   },
    //   enableSorting: false,
    //   enableHiding: true,
    // },
  ];

  return columns;
}
