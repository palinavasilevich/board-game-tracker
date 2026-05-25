import { AddGameDialog, UserGameList } from "@/src/features/games/my-games";

export default async function MyGamesPage() {
  return (
    <div className="w-full flex flex-col gap-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-cinzel text-3xl font-semibold tracking-tight uppercase">
            My Games
          </h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
            Your personal board game collection
          </p>
        </div>
        <AddGameDialog />
      </div>

      <UserGameList />
    </div>
  );
}
