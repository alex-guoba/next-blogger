import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";

import { unfurl } from "unfurl.js";

import { UnfurlSuccessResponse } from "@/types";
import { logger } from "@/lib/logger";

// https://iframely.com/docs/iframely-api
async function queryIframely(url: string) {
  if (!env.IFRAMELY_URI) {
    return null;
  }
  const param = new URLSearchParams({ url });
  if (env.IFRAMELY_API_KEY) {
    param.append("api_key", env.IFRAMELY_API_KEY);
  }
  const full = env.IFRAMELY_URI + "?" + param.toString();

  try {
    const result = await fetch(full, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 300 }, // cache time
    });
    const res = await result.json();
    return {
      title: res?.meta?.title,
      description: res?.meta?.description,
      favicon: res?.links?.icon[0]?.href,
      imageSrc: res?.links?.thumbnail[0].href,
      from: "iframely",
      raw: res,
    } as UnfurlSuccessResponse;
  } catch (e) {
    logger.error(e, `iframely query error: ${url}`);
  }
  return null;
}

// https://github.com/jacktuck/unfurl
async function unfurlParse(url: string) {
  if (!url) {
    return null;
  }

  return unfurl(url)
    .then((unfurlResponse) => {
      return {
        title: unfurlResponse.title ?? null,
        description: unfurlResponse.description ?? null,
        favicon: unfurlResponse.favicon ?? null,
        imageSrc: unfurlResponse.open_graph?.images?.[0]?.url ?? null,
        from: "unfurl",
        raw: unfurlResponse,
      } as UnfurlSuccessResponse;
    })
    .catch((error) => {
      logger.error(error, `unfurl parse error ${url}`);
      return null;
    });
}

// TODO: add authorization for client request
export async function GET(
  req: NextRequest
  // res: NextResponse
) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url || typeof url !== "string") {
    return NextResponse.json(
      {
        error: "Please enter title",
      },
      {
        status: 400,
      }
    );
  }

  // iframely first
  if (env.IFRAMELY_URI) {
    const res = await queryIframely(url);
    if (res) {
      return NextResponse.json(res);
    }
  }

  const res = await unfurlParse(url);
  if (res) {
    return NextResponse.json(res);
  }

  return NextResponse.json(
    {
      error: "Internal server error",
    },
    {
      status: 500,
    }
  );
}
