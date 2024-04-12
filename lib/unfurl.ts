import { useEffect, useState } from "react";
import { UnfurlSuccessResponse } from "@/types";

type RequestStatus = "iddle" | "loading" | "success" | "error";

// export type UrlData = {
//   title: string | null;
//   description?: string | null;
//   favicon?: string | null;
//   imageSrc?: string | null;

//   from: string;
//   raw?: any;
// };

export function useUnfurlUrl(url: string) {
  const [status, setStatus] = useState<RequestStatus>("iddle");
  const [data, setData] = useState<null | UnfurlSuccessResponse>(null);
  useEffect(() => {
    if (url) {
      setStatus("loading");
      const encoded = encodeURIComponent(url);
      fetch(`/api/unfurl?url=${encoded}`)
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            setData(data);
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch((error) => {
          console.log(error);

          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [url]);

  return { status, data };
}
