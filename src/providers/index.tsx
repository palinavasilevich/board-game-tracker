import { ReactNode } from "react";
import { QueryProvider } from "./query-provider/query-provider";
import { ThemeProvider } from "./theme-provider";
import { DiceLoader } from "@/src/components/dice-loader";

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
