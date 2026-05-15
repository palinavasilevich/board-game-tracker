import type { PropsWithChildren } from "react";
import { Header } from "./header/header";
import Image from "next/image";

export function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/main-bg.webp"
          alt=""
          className="object-cover"
          fill
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/25 to-black/55" />
      </div>

      <div className="relative z-10">
        <div className="container max-w-290 mx-auto">
          <Header />
          <main className="flex w-full flex-col items-center">{children}</main>
        </div>
      </div>
    </div>
  );
}
