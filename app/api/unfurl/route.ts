import { unfurl } from "unfurl.js";
import { NextRequest, NextResponse } from "next/server";

// type ErrorResponse = { error: string };
type SuccessResponse = {
  title?: string | null;
  description?: string | null;
  favicon?: string | null;
  imageSrc?: string | null;
  oEmbed?: any;
};

const CACHE_RESULT_SECONDS = 60 * 60 * 24; // 1 day

export async function GET(req: NextRequest) {
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

  return unfurl(url)
    .then((unfurlResponse) => {
      const response: SuccessResponse = {
        title: unfurlResponse.title ?? null,
        description: unfurlResponse.description ?? null,
        favicon: unfurlResponse.favicon ?? null,
        imageSrc: unfurlResponse.open_graph?.images?.[0]?.url ?? null,
        oEmbed: unfurlResponse.oEmbed ?? null,
      };

      const res = NextResponse.json(response);
      res.headers.set("Cache-Control", `public, max-age=${CACHE_RESULT_SECONDS}`);
      return res;
    })
    .catch((error) => {
      console.error(error.info);
      return NextResponse.json(
        {
          error: "Internal server error",
        },
        {
          status: 500,
        }
      );
    });
}
