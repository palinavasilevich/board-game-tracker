import { auth } from "@/auth";
import { GameCarousel } from "@/src/features/games/most-popular-games/ui/game-carousel";
import { BrowseCollectionSection } from "@/src/features/games/browse-games";
import { HeroSection } from "./_components/hero-section";
import { cn } from "@/src/lib/utils";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user?.id;

  return (
    <div className={cn("w-full flex flex-col py-6", isLoggedIn && "gap-12")}>
      {!isLoggedIn && <HeroSection />}

      <div className="flex flex-col gap-6 text-center">
        <div>
          <h2 className="font-cinzel text-3xl font-semibold tracking-tight uppercase">
            Most Popular on BoardGameGeek
          </h2>
          <p className="text-muted-foreground mt-2 text-sm tracking-wide uppercase">
            Top rated games by the BGG community
          </p>
        </div>

        <GameCarousel />
      </div>

      {isLoggedIn && <BrowseCollectionSection />}
    </div>
  );
}
