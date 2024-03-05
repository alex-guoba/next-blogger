import { Checkbox } from "@/components/ui/checkbox";
import RichText, { ColorMap } from "../../text";
import { cn, formatDate, formatTime } from "@/lib/utils";

export function titleCell(value: any) {
  if (!value) {
    return null;
  }
  return (
    <span>
      <RichText title={value} className="whitespace-pre-wrap" />
    </span>
  );
}

export function selectCell(value: any) {
  if (!value) {
    return null;
  }
  const cl = ColorMap.get(value.color) ? ColorMap.get(value.color)?.replace(/^(text-)/, "bg-") : "bg-gray-100";

  return (
    <span key={value.id} className={cn(cl, "px-1")}>
      {value.name}
    </span>
  );
}

export function multiSelectCell(mvalue: any) {
  if (!mvalue) {
    return null;
  }
  return (
    <div>
      {mvalue.map((value: any) => {
        return selectCell(value);
      })}
    </div>
  );
}

export function checkBoxCell(value: any) {
  return <Checkbox checked={value} />;
}

export function timeCell(value: any) {
  return <div>{value ? formatTime(value) : ""}</div>;
}

export function dateCell(value: any) {
  const { start, end } = value;
  let str = start ? formatDate(start) : "";
  if (end) {
    str += ` -> ${formatDate(end)}`;
  }
  return <span>{str}</span>;
}

export function rawCell(value: any, className?: string) {
  if (!value) {
    return null;
  }
  return <span className={className}>{value}</span>;
}

export function fileCell(mfiles: any) {
  if (!mfiles) {
    return null;
  }
  return (
    <div className="max-w-48 space-y-1">
      {mfiles.map((value: any, index: number) => {
        const { name, external, file } = value || {};
        const url = external?.url || file?.url;
        if (!url) {
          return null;
        }
        return (
          <a
            key={`seq-${index}`}
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            className="block truncate rounded bg-slate-300 p-1 text-gray-500"
          >
            {name}
          </a>
        );
      })}
    </div>
  );
}

export function urlCell(value: any) {
  if (!value) {
    return null;
  }
  return (
    <div className="max-w-48 truncate underline underline-offset-4 decoration-1">
      <a href={value} target="_blank" rel="noreferrer noopener" className="text-gray-500">
        {value}
      </a>
    </div>
  );
}

export function statusCell(value: any) {
  if (!value) {
    return null;
  }
  const cl = ColorMap.get(value.color) ? ColorMap.get(value.color)?.replace(/^(text-)/, "bg-") : "bg-gray-100";

  return (
    <div key={value.id} className={cn(cl, "block rounded-lg px-1")}>
      {value.name}
    </div>
  );
}
