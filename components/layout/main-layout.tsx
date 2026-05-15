import type { PropsWithChildren } from "react";
import { Header } from "./header/header";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-1/4 left-1/2 h-150 w-225 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -right-1/4 top-1/2 h-100 w-150 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto max-w-290">
          <Header />
        </div>
      </div>

      <div className="container mx-auto max-w-290">
        <main className="flex w-full flex-col items-center py-8">{children}</main>
      </div>
    </div>
  );
}
