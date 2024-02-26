import { useEffect, useState } from "react";

type RequestStatus = "iddle" | "loading" | "success" | "error";

export type IFramelyData = {
  // Meta object with attribution & semantics
  meta?: object;

  // Plus list of all media that we have for this URL
  links?: object;
  // Rel use cases and html code for primary variant of embed
  // Check for `autoplay` if you requested i
  rel?: object;
  // That's the embed code we recommend
  html?: object;
};

export function useIFramelyURL(url: string) {
  const [status, setStatus] = useState<RequestStatus>("iddle");
  const [data, setData] = useState<null | IFramelyData>(null);

  useEffect(() => {
    if (url) {
      setStatus("loading");
      const encoded = encodeURIComponent(url);
      fetch(`/api/iframely?url=${encoded}&omit_script=1`)
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
          console.error(error);

          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [url]);

  return { status, data };
}
