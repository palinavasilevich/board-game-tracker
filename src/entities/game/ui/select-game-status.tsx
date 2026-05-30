import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";

import { UserGameStatus } from "@/src/lib/generated/prisma/enums";
import { UserIcon, GiftIcon, LucideIcon } from "lucide-react";

const STATUS_LABELS: Record<UserGameStatus, string> = {
  OWNED: "Owned",
  WISHLIST: "Wishlist",
};

const STATUS_ICON: Record<UserGameStatus, LucideIcon> = {
  OWNED: UserIcon,
  WISHLIST: GiftIcon,
};

type SelectGameStatusProps = {
  status?: UserGameStatus;
  setStatus: (status: UserGameStatus) => void;
};

export function SelectGameStatus({ status, setStatus }: SelectGameStatusProps) {
  return (
    <Select
      value={status}
      onValueChange={(value) => setStatus(value as UserGameStatus)}
    >
      <SelectTrigger className="w-full flex-1">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        {Object.values(UserGameStatus).map((status) => {
          const ItemIcon = STATUS_ICON[status];
          return (
            <SelectItem key={status} value={status}>
              <span className="flex items-center gap-2">
                <ItemIcon />
                {STATUS_LABELS[status]}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
