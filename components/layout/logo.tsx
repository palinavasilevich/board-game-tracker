import { cn } from "@/lib/utils";
import { ROUTES } from "@/shared/constants/routes";
import { DicesIcon } from "lucide-react";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <Link href={ROUTES.HOME} className={cn(className)}>
      <DicesIcon className="size-5" />
      <span className="text-base font-semibold">Board Games</span>
    </Link>
  );
}
