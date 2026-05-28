export function getScoreColor(
  score: number,
  shade: "400" | "500" = "400",
): string {
  if (score >= 6) return `text-emerald-${shade}`;
  if (score >= 4) return `text-yellow-${shade}`;
  return `text-red-${shade}`;
}
