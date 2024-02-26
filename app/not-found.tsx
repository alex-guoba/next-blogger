import Shell from "@/components/shells/shell";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NotFound = async () => {
  return (
    <>
      <Shell className="md:py-24">
        <section className="my-4 text-center">
          <p className="text-[6rem] font-semibold">404</p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Page not found</h1>

          <p className="mt-6 text-base leading-7">Sorry, we couldn’t find the page you’re looking for.</p>

          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/" className={cn(buttonVariants({ className: "mx-auto mt-4 w-fit" }))}>
              {" "}
              Go back home{" "}
            </Link>
            {/* <a href="#" className="text-sm font-semibold text-gray-900">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a> */}
          </div>
        </section>
      </Shell>
    </>
  );
};

export default NotFound;
