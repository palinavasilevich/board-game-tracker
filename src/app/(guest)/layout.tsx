import type { PropsWithChildren } from "react";
import { Button } from "@/src/components/ui/button";
import { Logo } from "@/src/components/layout/logo";
import { ThemeToggle } from "@/src/components/theme-toggle";

export default function GuestLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="border-b py-2 px-4 lg:px-6">
        <div
          className="mx-auto flex shrink-0 justify-between items-center"
          style={{
            maxWidth: "80rem",
          }}
        >
          <Button asChild variant="ghost">
            <Logo />
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 w-full items-center justify-center p-6">
        <div className="w-full max-w-sm mx-auto" style={{ maxWidth: "24rem" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
