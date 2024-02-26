import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env.mjs";

const CACHE_RESULT_SECONDS = 60 * 60 * 24; // 1 day

export async function GET(
  req: NextRequest
  // res: NextResponse
) {
  const searchParams = req.nextUrl.searchParams;
  const url = searchParams.get("url");

  console.log("iframely query url: ", url);

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

  // API see: https://iframely.com/docs/iframely-api#api-request
  // TODO: parameter opnization
  let full = env.IFRAMELY_URI + `?url=${url}`;
  if (env.IFRAMELY_KEY && env.IFRAMELY_KEY !== "") {
    full += `&key=${env.IFRAMELY_KEY}`;
  }

  try {
    const result = await fetch(full, {
      headers: {
        "Content-Type": "application/json",
        // 'API-Key': process.env.DATA_API_KEY,
      },
    });
    const data = await result.json();
    const res = NextResponse.json(data);
    res.headers.set("Cache-Control", `public, max-age=${CACHE_RESULT_SECONDS}`);
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}

// return Response.json({ data })
// return fetch(full)
//   .then((unfurlResponse) => {
//     console.log(unfurlResponse)

//     const response = {
//       title: unfurlResponse.title ?? null,
//       description: unfurlResponse.description ?? null,
//       favicon: unfurlResponse.favicon ?? null,
//       imageSrc: unfurlResponse.open_graph?.images?.[0]?.url ?? null,
//       oEmbed: unfurlResponse.oEmbed ?? null,
//     };

//     const res = NextResponse.json(response);
//     res.headers.set(
//       "Cache-Control",
//       `public, max-age=${CACHE_RESULT_SECONDS}`
//     );
//     return res;
//   })
//   .catch((error) => {
//     console.error(error);
//     return NextResponse.json(
//       {
//         error: "Internal server error",
//       },
//       {
//         status: 500,
//       }
//     );
//   });
// }
