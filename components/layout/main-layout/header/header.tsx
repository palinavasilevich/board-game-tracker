import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { User as AuthUser } from "next-auth";
import { UserAvatarButton } from "@/components/user-avatar-button/user-avatar-button";
import { ThemeToggle } from "@/components/theme-toggle";

type HeaderProps = {
  user?: AuthUser;
};

export async function Header({ user }: HeaderProps) {
  return (
    <header className="flex shrink-0 items-center gap-2 border-b py-2">
      <div
        className="flex w-full mx-auto max-w-7xl items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6"
        style={{ maxWidth: "80rem" }}
      >
        <Button asChild variant="ghost" type="button">
          <Logo />
        </Button>
        {user && (
          <nav>
            <div className="flex gap-2">
              <UserAvatarButton user={user} />
            </div>
          </nav>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
