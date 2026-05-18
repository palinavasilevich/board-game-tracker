import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/routes";
import { DicesIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b py-2">
        <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
          <Button asChild variant="ghost" type="button">
            <Link href={ROUTES.HOME}>
              <DicesIcon className="size-5!" />
              <span className="text-base font-semibold">Board Games</span>
            </Link>
          </Button>
        </div>
      </header>
      {children}
    </>
  );
}
