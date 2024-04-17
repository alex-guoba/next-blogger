// "use client";

import Shell from "@/components/shells/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <>
      <Shell variant="centered" className="">
        <section className="my-4 text-center">
          <p className="text-[6rem] font-semibold">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">{t("404Title")}</h1>
          <p className="mt-6 text-base leading-7">{t("404Description")}</p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" className={cn(buttonVariants({ className: "mx-auto mt-4 w-fit" }))}>
              {t("BackToHomeButtonLabel")}
            </Link>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </section>
      </Shell>
    </>
  );
}

// export default NotFoundPage;
