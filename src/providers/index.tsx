"use client";

import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { QueryProvider } from "./query-provider/query-provider";
import { ThemeProvider } from "./theme-provider";

const DiceLoader = dynamic(
  () => import("@/src/components/dice-loader").then((m) => m.DiceLoader),
  { ssr: false }
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <DiceLoader />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
