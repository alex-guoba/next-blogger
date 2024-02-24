import { unfurl } from "unfurl.js";
import { NextRequest, NextResponse } from "next/server";

type ErrorResponse = { error: string };
type SuccessResponse = {
  title?: string | null;
  description?: string | null;
  favicon?: string | null;
  imageSrc?: string | null;
};

const CACHE_RESULT_SECONDS = 60 * 60 * 24; // 1 day

export async function GET(
  req: NextRequest,
  res: NextResponse<SuccessResponse | ErrorResponse>
) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  console.log('query url', url);

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
      // console.log(unfurlResponse)

      const response = {
        title: unfurlResponse.title ?? null,
        description: unfurlResponse.description ?? null,
        favicon: unfurlResponse.favicon ?? null,
        imageSrc: unfurlResponse.open_graph?.images?.[0]?.url ?? null,
      };

      const res = NextResponse.json(response);
      res.headers.set(
        "Cache-Control",
        `public, max-age=${CACHE_RESULT_SECONDS}`
      );
      return res;
    })
    .catch((error) => {
      console.error(error);
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
