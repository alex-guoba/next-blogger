import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { AllLocales } from "@/config/locale";

export const { usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: AllLocales,
  localePrefix: "as-needed",
});
