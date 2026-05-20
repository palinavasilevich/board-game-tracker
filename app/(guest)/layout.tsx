import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="flex shrink-0 justify-between items-center border-b py-2 px-4 lg:px-6">
        <Button asChild variant="ghost">
          <Logo />
        </Button>
        <ThemeToggle />
      </header>
      {children}
    </div>
  );
}
