// for debugging purposes only

import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
// import v8 from "v8";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get("gc");

  // dump
  if (state == "free") {
    // const fileName = v8.writeHeapSnapshot();
    // console.log(`Created heapdump file: ${fileName}`);

    revalidateTag("posts");

    return NextResponse.json({
      result: "success",
    });
  }

  const formatMemoryUsage = (data: number) => `${Math.round((data / 1024 / 1024) * 100) / 100} MB`;

  const memoryData = process.memoryUsage();
  const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
    arrayBuffers: `${formatMemoryUsage(memoryData.arrayBuffers)} -> array buffers`,
  };

  // const res = NextResponse.json(memoryUsage);
  return NextResponse.json(memoryUsage);
}
