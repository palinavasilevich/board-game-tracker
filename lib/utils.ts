import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ROUTES } from "@/shared/constants/routes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TabValue = "dashboard";

export function getTabValue(pathname: string): TabValue | undefined {
  if (pathname === ROUTES.DASHBOARD || pathname.startsWith(`${ROUTES.DASHBOARD}/`))
    return "dashboard";
}
