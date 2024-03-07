// for debugging purposes only

import { NextRequest, NextResponse } from "next/server";
import v8 from "v8";
import { runInNewContext } from 'vm';


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const state = searchParams.get("gc");

  // enabling trace-gc
  if (state === "start") {
    v8.setFlagsFromString("--trace-gc");

    const gc = runInNewContext('gc'); // nocommit
    gc();

    return NextResponse.json({
      result: "gc success",
    });
  } 
  
  // dump
  if (state == "dump") {
      const fileName = v8.writeHeapSnapshot();
      console.log(`Created heapdump file: ${fileName}`);
   
    return NextResponse.json({
      result: "dump success",
      fileName: fileName,
    });
  }

  // const searchParams = req.nextUrl.searchParams;
  // if (global.gc) {
  //   global.gc();
  // } else {
  //   console.log(
  //     "Garbage collection unavailable.  Pass --expose-gc when launching node to enable forced garbage collection."
  //   );
  // }
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
