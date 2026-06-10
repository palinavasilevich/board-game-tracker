import { FriendsList } from "@/src/features/friends";

export default function FriendsPage() {
  return (
    <div className="w-full flex flex-col mt-8 gap-10">
      <div className="flex flex-col items-center text-center gap-3">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight uppercase">
            Friends
          </h1>
          <p className="text-muted-foreground mt-1 text-sm tracking-wide uppercase">
            Follow others and browse their collections
          </p>
        </div>
      </div>

      <div>
        <section className="flex flex-col gap-4">
          <FriendsList />
        </section>
      </div>
    </div>
  );
}
