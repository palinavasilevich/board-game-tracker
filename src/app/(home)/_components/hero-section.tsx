import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center gap-6 py-10 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
          Your Board Game Library,
          <br />
          Organized
        </h1>
        <p className="text-muted-foreground text-base tracking-wide max-w-md mx-auto">
          Track your collection, log play sessions, and discover new games loved
          by the BoardGameGeek community.
        </p>
      </div>

      <div className="flex gap-3">
        <Button asChild size="lg">
          <Link href="/signup">Get Started</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    </div>
  );
}
