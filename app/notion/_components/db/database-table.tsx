"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTableColumnHeader } from "./column-header";
import { DataTablePagination } from "./pagination";

import { Checkbox } from "@/components/ui/checkbox";

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  index: number;
  guid: string;
  isActive?: boolean;
  picture?: string;
  balance?: string;
  gender?: string;
  address?: string;
  about?: string;
  registered?: string;
  tags?: string[];
};

const payments: Payment[] = [
  {
    id: "65e3145e51e636d0ae176cb3",
    amount: 6978,
    status: "success",
    email: "norrissimmons@zolarity.com",
    index: 0,
    guid: "831c859e-4c7e-4c1d-be51-2d4db0622552",
    isActive: false,
    balance: "$2,099.79",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "133 Jay Street, Drytown, Arizona, 474",
    about:
      "Et labore tempor nulla sit tempor incididunt. Consectetur ea exercitation excepteur amet non quis occaecat elit et esse nostrud laboris ea. Nisi dolor deserunt proident id dolor magna deserunt quis ea aliquip fugiat ipsum. Deserunt et aliquip irure mollit ullamco adipisicing aute. Sit eiusmod mollit Lorem deserunt duis veniam ea. Occaecat mollit non cupidatat officia.\r\n",
    registered: "2023-12-29T10:47:28 -08:00",
    tags: ["reprehenderit", "aliquip", "magna", "laboris", "laborum", "consequat", "consectetur"],
  },
  {
    id: "65e3145ea4f2fb32e866b1cb",
    amount: 799,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 1,
    guid: "ea6670a9-b095-4682-bcbf-9086048562c8",
    isActive: false,
    balance: "$2,242.91",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "568 Lafayette Walk, Bowie, Nebraska, 6795",
    about:
      "In fugiat laborum ex veniam ex incididunt ea. Laboris irure excepteur pariatur voluptate nostrud ex anim in ipsum cillum ad. Laborum aliquip sit deserunt ex fugiat sunt officia sint cupidatat sint fugiat minim. Lorem id ea est proident occaecat. Laborum velit in et duis consectetur reprehenderit adipisicing cillum quis enim ad. Id velit ipsum do cillum.\r\n",
    registered: "2023-07-17T07:14:21 -08:00",
    tags: ["enim", "fugiat", "id", "duis", "excepteur", "quis", "amet"],
  },
  {
    id: "65e3145eb27cc60b9dfd7001",
    amount: 7681,
    status: "failed",
    email: "norrissimmons@zolarity.com",
    index: 2,
    guid: "327b1d60-f2df-4d9e-afc2-bd3a39fea1a7",
    isActive: false,
    balance: "$1,742.67",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "794 Hubbard Place, Adelino, American Samoa, 6066",
    about:
      "Eu sit sunt sint ea aute ad ea ullamco id officia. Amet exercitation culpa officia deserunt ullamco amet laborum laborum commodo ex quis laboris veniam ullamco. Ex deserunt aute dolore sint esse ea consequat. Ex dolore consectetur exercitation exercitation ullamco do in do nisi officia dolor exercitation velit est. Dolore laborum in minim labore excepteur aliqua amet reprehenderit ex.\r\n",
    registered: "2020-08-16T08:31:04 -08:00",
    tags: ["aute", "nostrud", "nostrud", "deserunt", "laboris", "pariatur", "incididunt"],
  },
  {
    id: "65e3145eada3c156e6423abf",
    amount: 8377,
    status: "processing",
    email: "norrissimmons@zolarity.com",
    index: 3,
    guid: "206bece2-bea7-40cd-ad8c-0016c4e32f63",
    isActive: false,
    balance: "$2,726.74",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "917 Coyle Street, Finzel, North Dakota, 2539",
    about:
      "Tempor cillum non eu quis mollit reprehenderit est elit commodo laboris fugiat consectetur. Non eu sit nostrud et deserunt nisi reprehenderit laboris cupidatat excepteur dolor. Id proident commodo velit nisi id sunt elit consequat exercitation nisi Lorem sint. Sunt in aliquip cillum nisi ut commodo incididunt laboris ut qui ea adipisicing. Ipsum quis elit et eiusmod sunt do eu incididunt ad nostrud sint ut. Ipsum ea officia pariatur excepteur voluptate.\r\n",
    registered: "2014-10-09T07:17:31 -08:00",
    tags: ["nulla", "tempor", "id", "consequat", "nulla", "sint", "aliquip"],
  },
  {
    id: "65e3145e3059ba594c54a431",
    amount: 4674,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 4,
    guid: "909ffc78-e2b6-4635-9d82-c32f554b8a6f",
    isActive: false,
    balance: "$1,543.08",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "321 Harbor Court, Cavalero, Alabama, 5818",
    about:
      "Ullamco consectetur irure tempor sit ad aute dolor amet sunt incididunt deserunt. Officia officia sit occaecat voluptate dolore. Est velit veniam labore aliqua duis culpa.\r\n",
    registered: "2018-07-31T12:51:54 -08:00",
    tags: ["ut", "labore", "deserunt", "nulla", "adipisicing", "amet", "est"],
  },
  {
    id: "65e3145eb77e7c6a8d2f0943",
    amount: 3659,
    status: "processing",
    email: "norrissimmons@zolarity.com",
    index: 5,
    guid: "c790894d-d436-4653-a10e-b884ae08a98d",
    isActive: true,
    balance: "$3,582.94",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "829 Arkansas Drive, Montura, Wyoming, 3253",
    about:
      "Ullamco exercitation exercitation ipsum laborum deserunt. Nisi culpa ex esse aute adipisicing qui culpa ex fugiat culpa enim amet. Elit voluptate dolore cupidatat id aliquip mollit tempor excepteur consequat voluptate ullamco exercitation excepteur eu.\r\n",
    registered: "2014-04-27T12:50:38 -08:00",
    tags: ["exercitation", "sunt", "commodo", "deserunt", "in", "irure", "dolor"],
  },
  {
    id: "65e3145e7f8291ce986b2bac",
    amount: 2651,
    status: "success",
    email: "norrissimmons@zolarity.com",
    index: 6,
    guid: "a10857a8-e5e1-4fbf-aa4e-f30ab0e7a19b",
    isActive: false,
    balance: "$2,122.30",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "662 Columbia Place, Weeksville, District Of Columbia, 9624",
    about:
      "Amet mollit ut consectetur aliqua irure ut incididunt non veniam. Adipisicing ex est ullamco ullamco proident magna incididunt nostrud. Voluptate magna proident ipsum voluptate proident reprehenderit esse id consectetur nulla. Veniam incididunt ex deserunt consectetur aliqua laboris tempor anim.\r\n",
    registered: "2015-11-23T05:41:10 -08:00",
    tags: ["Lorem", "duis", "elit", "nisi", "consectetur", "occaecat", "do"],
  },
  {
    id: "65e3145ea9d7be5f39138f24",
    amount: 7972,
    status: "success",
    email: "norrissimmons@zolarity.com",
    index: 7,
    guid: "9f46a496-222a-4391-b6d0-de42f8e87584",
    isActive: false,
    balance: "$1,002.30",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "649 Langham Street, Torboy, Massachusetts, 7123",
    about:
      "Elit magna aliqua anim minim. Minim reprehenderit commodo fugiat esse esse sunt nostrud anim. Et aute incididunt sunt cupidatat esse excepteur Lorem culpa veniam. Irure dolor officia officia est adipisicing irure commodo officia velit aliquip proident eiusmod excepteur. Elit dolor est ad elit duis commodo nisi elit elit exercitation amet. Aliqua occaecat id ipsum duis ex qui magna dolore in amet occaecat officia est culpa.\r\n",
    registered: "2023-10-14T01:14:38 -08:00",
    tags: ["minim", "ad", "irure", "id", "aute", "cillum", "laborum"],
  },
  {
    id: "65e3145e9f68d9ca32f49d12",
    amount: 3378,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 8,
    guid: "1c761286-95b8-4f40-99f3-adb4e80ed5d2",
    isActive: false,
    balance: "$1,738.07",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "152 Indiana Place, Salvo, Tennessee, 3432",
    about:
      "In pariatur ullamco excepteur laborum magna adipisicing. Deserunt do in labore officia non mollit sint adipisicing exercitation proident commodo amet. Aliquip amet commodo voluptate excepteur duis non ut ut aliquip nisi consectetur mollit. Veniam in aliquip do aliqua eiusmod commodo do labore occaecat.\r\n",
    registered: "2015-12-03T01:04:21 -08:00",
    tags: ["commodo", "quis", "et", "incididunt", "occaecat", "magna", "quis"],
  },
  {
    id: "65e3145e99125861ffb035a6",
    amount: 436,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 9,
    guid: "6933fe3c-59bb-47ee-8ca8-9b4a7cb2c93d",
    isActive: false,
    balance: "$2,585.88",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "328 Lexington Avenue, Reinerton, Rhode Island, 8087",
    about:
      "Sit voluptate cillum ea laborum reprehenderit eiusmod laboris aliqua. Ad ut adipisicing Lorem magna ut incididunt id. Cillum incididunt cupidatat laborum Lorem veniam adipisicing id aute nisi tempor in sint. Qui ea excepteur dolor proident tempor duis eiusmod velit cillum occaecat est Lorem.\r\n",
    registered: "2016-06-18T04:33:31 -08:00",
    tags: ["occaecat", "labore", "amet", "excepteur", "ullamco", "aliqua", "veniam"],
  },
  {
    id: "65e3145e09474c2cf6f92a51",
    amount: 8972,
    status: "success",
    email: "norrissimmons@zolarity.com",
    index: 10,
    guid: "e368881d-d116-409e-8253-6ceba5172684",
    isActive: false,
    balance: "$3,586.47",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "120 Hendrix Street, Walton, North Carolina, 1404",
    about:
      "Ullamco incididunt duis qui ea nisi. Laboris velit do esse Lorem proident duis culpa aliqua fugiat eiusmod. Magna ullamco veniam officia ullamco ea. Ullamco veniam nisi nostrud eu voluptate.\r\n",
    registered: "2022-12-28T04:34:12 -08:00",
    tags: ["minim", "ad", "Lorem", "dolor", "enim", "irure", "culpa"],
  },
  {
    id: "65e3145e596c65ffa34d1b00",
    amount: 2329,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 11,
    guid: "a610ac65-5a41-4db2-818c-19a293ad6cff",
    isActive: false,
    balance: "$3,261.24",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "783 Stockholm Street, Loretto, Washington, 4093",
    about:
      "Anim deserunt qui nulla voluptate consectetur ad enim amet qui. Irure consequat magna dolor do eu laboris ex nulla deserunt in. Lorem veniam amet exercitation ipsum labore consectetur.\r\n",
    registered: "2015-05-08T06:15:29 -08:00",
    tags: ["labore", "exercitation", "in", "mollit", "dolore", "eiusmod", "magna"],
  },
  {
    id: "65e3145e67ecf657762c5cdc",
    amount: 3172,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 12,
    guid: "0d508736-ca6c-417f-a55e-f698f01d3ae2",
    isActive: false,
    balance: "$2,630.72",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "235 Exeter Street, Summertown, Puerto Rico, 3882",
    about:
      "Dolor id velit fugiat cupidatat sit veniam. Est et et cillum est esse exercitation minim occaecat consectetur ad enim id adipisicing aute. Do aute occaecat pariatur deserunt laborum. Esse do fugiat do voluptate ipsum tempor magna. Velit do excepteur deserunt enim.\r\n",
    registered: "2016-07-01T06:24:07 -08:00",
    tags: ["nisi", "cillum", "ullamco", "do", "aliqua", "laborum", "ullamco"],
  },
  {
    id: "65e3145e7ea2329a41eab82d",
    amount: 7242,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 13,
    guid: "ae360710-71eb-479a-a627-72b2cb2fba95",
    isActive: false,
    balance: "$1,701.76",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "931 Irving Avenue, Robinson, Vermont, 8911",
    about:
      "Consectetur anim ex incididunt aute consectetur. Cillum in esse nulla sint. Est duis duis sint incididunt ipsum enim enim reprehenderit pariatur do labore aute. Consequat consequat deserunt aliqua cillum aute commodo qui ullamco dolor eiusmod elit proident.\r\n",
    registered: "2019-02-08T06:05:18 -08:00",
    tags: ["in", "non", "voluptate", "ullamco", "voluptate", "irure", "elit"],
  },
  {
    id: "65e3145e972a07948a75707f",
    amount: 4211,
    status: "success",
    email: "norrissimmons@zolarity.com",
    index: 14,
    guid: "8e1d5ba0-aa49-41e1-a984-ab558329eef2",
    isActive: true,
    balance: "$1,752.19",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "754 Tennis Court, Chemung, New York, 1127",
    about:
      "Magna enim amet proident fugiat irure adipisicing ipsum labore in aliqua laboris. Enim ad esse duis exercitation amet mollit. Irure occaecat amet pariatur exercitation culpa fugiat eu id.\r\n",
    registered: "2019-08-03T01:45:49 -08:00",
    tags: ["incididunt", "veniam", "sit", "fugiat", "nulla", "ad", "qui"],
  },
  {
    id: "65e3145e4e7c71126f21e990",
    amount: 7436,
    status: "pending",
    email: "norrissimmons@zolarity.com",
    index: 15,
    guid: "8be055cd-e5ae-401e-9086-81c50c8d775e",
    isActive: true,
    balance: "$1,539.65",
    picture: "http://placehold.it/32x32",
    gender: "male",
    address: "869 Boulevard Court, Cliff, Virginia, 1498",
    about:
      "Voluptate voluptate officia id anim adipisicing nostrud. Nostrud labore veniam tempor culpa elit. Ex ea incididunt aliqua eiusmod amet nulla consequat ullamco veniam pariatur laborum nulla magna veniam. Sunt aliqua anim veniam mollit ex exercitation id mollit. Officia deserunt enim deserunt et reprehenderit eu.\r\n",
    registered: "2021-11-24T12:42:05 -08:00",
    tags: ["sunt", "in", "Lorem", "pariatur", "ad", "sunt", "minim"],
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataBaseTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });

  return (
    <div className="w-max-full w-full caption-bottom space-y-4 rounded-md text-sm">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // className="h-16"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      <div className="max-w-[400px] py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table}></DataTablePagination>
    </div>
  );
}

export function DemoTable() {
  const columns: ColumnDef<Payment>[] = [
    {
      id: "_select",
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
    },
    {
      accessorKey: "amount",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Amount" />,
      enableSorting: false,
      enableHiding: true,
    },
    {
      accessorKey: "status",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    },
    {
      accessorKey: "email",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    },
    {
      accessorKey: "guid",
      header: ({ column }) => <DataTableColumnHeader column={column} title="GUID" />,
    },
    {
      accessorKey: "index",
      header: ({ column }) => <DataTableColumnHeader column={column} title="Index" />,
    },
    {
      accessorKey: "isActive",
      header: ({ column }) => <DataTableColumnHeader column={column} title="IsActive" />,
    },
    {
      accessorKey: "balance",
      header: ({ column }) => <DataTableColumnHeader column={column} title="balance" />,
    },
    {
      accessorKey: "picture",
      header: ({ column }) => <DataTableColumnHeader column={column} title="picture" />,
    },
    {
      accessorKey: "gender",
      header: ({ column }) => <DataTableColumnHeader column={column} title="gender" />,
    },
    {
      accessorKey: "address",
      header: ({ column }) => <DataTableColumnHeader column={column} title="address" />,
    },
    {
      accessorKey: "about",
      header: ({ column }) => <DataTableColumnHeader column={column} title="about" />,
    },
    {
      accessorKey: "registered",
      header: ({ column }) => <DataTableColumnHeader column={column} title="registered" />,
    },
    {
      accessorKey: "tags",
      header: ({ column }) => <DataTableColumnHeader column={column} title="tags" />,
      cell: ({ row }) => {
        const value = row.getValue("tags");
        console.log(value);
        return (
          <div className="flex flex-wrap">
            {value.map((tag) => (
              <div key={tag} className="underline">
                {tag}
              </div>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <div className="w-full max-w-full">
      <DataBaseTable columns={columns} data={payments}></DataBaseTable>
    </div>
  );
}
