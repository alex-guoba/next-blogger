import { cache } from "react";
import { createClient } from "./server";

export const getCacheUser = cache(async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});
