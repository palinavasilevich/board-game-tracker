import { HeaderNav } from "./header-nav";
import { User as AuthUser } from "next-auth";

type HeaderProps = {
  user?: AuthUser;
};

export async function Header({ user }: HeaderProps) {
  return (
    <header className="py-2 shrink-0 items-center gap-2 border-b">
      <div className="w-full mx-auto max-w-8xl flex items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <HeaderNav user={user} />
      </div>
    </header>
  );
}
