import { ROUTES } from "@/src/shared/constants/routes";
import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/src/lib/utils";
import { DiceIcon } from "@/src/components/icons/dice-icon";

type LogoProps = Omit<ComponentProps<typeof Link>, "href">;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link
      href={ROUTES.HOME}
      className={cn("gap-3!", className)}
      {...props}
    >
      <DiceIcon className="size-5! ml-1.5" />
      <span className="font-cinzel text-sm font-bold tracking-widest uppercase">
        Board Games
      </span>
    </Link>
  );
}
