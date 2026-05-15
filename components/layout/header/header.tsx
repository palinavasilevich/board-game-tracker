import Link from "next/link";
import { auth } from "@/auth";
import { ROUTES } from "@/shared/constants/routes";
import { HeaderNav } from "./header-nav";
import { Logo } from "./logo";

export async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center p-4">
      <div className="shrink-0">
        <Link href={session?.user ? ROUTES.DASHBOARD : ROUTES.HOME}>
          <Logo />
        </Link>
      </div>
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
    </header>
  );
}
