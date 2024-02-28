import { cn } from "@/lib/utils";
import RichText from "../text";

import {
  Table,
  TableBody,
  // TableCaption,
  TableCell,
  // TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableProps {
  block: any;
  className?: string | undefined;
}

function renderHeader(children: any) {
  const first = children[0];
  if (!first) {
    return null;
  }
  return (
    <TableHeader>
      <TableRow>
        {first.table_row?.cells?.map((cell: { plain_text: any }, i: number) => (
          <TableHead
            key={`head-${cell.plain_text}-${i}`}
            className="w-[100px] bg-stone-100"
          >
            <RichText title={cell} />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}

function renderCell(has_column_header: boolean, has_row_header: boolean, children: any) {
  // console.log(children);
  return (
    <TableBody>
      {children?.map((child: any, index: number) => {
        if (has_column_header && index == 0) {
          return null;
        }
        return (
          <TableRow key={`row-${index}`}>
            {child.table_row?.cells?.map((cell: { plain_text: any }, i: number) => (
              <TableCell key={`${index}-${i}`} className={i == 0 && has_row_header ? "bg-stone-100" : ""}>
                <RichText title={cell} />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </TableBody>
  );
}

export function TableRenderer({ block, className }: TableProps) {
  const {
    id,
    table: { has_column_header, has_row_header },
  } = block;

  if (!block?.children) {
    return null;
  }
  return (
    <Table key={id} className={cn(className, "border border-solid border-inherit")}>
      {has_column_header && renderHeader(block.children)}
      {renderCell(has_column_header, has_row_header, block.children)}
    </Table>
  );
}
