import Link from "next/link";
import { ROUTES } from "@/shared/constants/routes";

export function Logo() {
  return (
    <Link
      href={ROUTES.HOME}
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
    >
      Board Game Tracker
    </Link>
  );
}
