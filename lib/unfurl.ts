import { useEffect, useState } from "react";

type RequestStatus = "iddle" | "loading" | "success" | "error";

export type UrlData = {
  title: string | null;
  description?: string | null;
  favicon?: string | null;
  imageSrc?: string | null;
};

export function useUnfurlUrl(url: string) {
  const [status, setStatus] = useState<RequestStatus>("iddle");
  const [data, setData] = useState<null | UrlData>(null);
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
          console.error(error);

          setStatus("error");
        });
    } else {
        setStatus("error");
    }
  }, [url]);

  return { status, data };
}
