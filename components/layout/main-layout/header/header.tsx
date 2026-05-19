import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { UserAvatar } from "@/components/user-avatar";
import { User as AuthUser } from "next-auth";
import { LogoutButton } from "./logout-button";

type HeaderProps = {
  user?: AuthUser;
};

export async function Header({ user }: HeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b py-2">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <Button asChild variant="ghost" type="button">
          <Logo />
        </Button>
        {user && (
          <nav>
            <div className="flex gap-2">
              <UserAvatar user={user} />
              <LogoutButton />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
