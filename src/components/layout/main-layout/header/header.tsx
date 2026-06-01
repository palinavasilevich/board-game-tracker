import { HeaderNav } from "./header-nav";
import { User as AuthUser } from "next-auth";

type HeaderProps = {
  user?: AuthUser;
};

export async function Header({ user }: HeaderProps) {
  return (
    <header className="py-2 shrink-0 border-b sticky top-0 z-50 bg-background">
      <div className="w-full mx-auto max-w-400 flex items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <HeaderNav user={user} />
      </div>
    </header>
  );
}
