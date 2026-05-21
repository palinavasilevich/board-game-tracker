import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { getUserInitials } from "@/src/lib/get-user-initials";
import { User as AuthUser } from "next-auth";

type UserAvatarProps = {
  user: AuthUser;
};

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg grayscale">
        <AvatarImage
          src={user?.image ?? ""}
          alt={user?.name ?? "User Avatar Image"}
        />
        <AvatarFallback className="text-xs">
          {getUserInitials(user?.name ?? "")}
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{user.name}</span>
        <span className="truncate text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </>
  );
}
