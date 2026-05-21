import { cn } from "@/src/lib/utils";
import { ROUTES } from "@/src/shared/constants/routes";
import { DicesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

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
