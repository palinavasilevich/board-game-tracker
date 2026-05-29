import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { cn } from "@/src/lib/utils";
import { UserGameStatus } from "@/src/lib/generated/prisma/enums";

const STATUS_LABELS: Record<UserGameStatus, string> = {
  OWNED: "Owned",
  WISHLIST: "Wishlist",
};

const STATUS_DOT_COLOR: Record<UserGameStatus, string> = {
  OWNED: "bg-emerald-400",
  WISHLIST: "bg-amber-400",
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
      <SelectTrigger className="w-full">
        <span className="flex items-center gap-2">
          {status && (
            <span className={cn("size-2 rounded-full shrink-0", STATUS_DOT_COLOR[status])} />
          )}
          <SelectValue placeholder="Select status" />
        </span>
      </SelectTrigger>
      <SelectContent>
        {Object.values(UserGameStatus).map((s) => (
          <SelectItem key={s} value={s}>
            <span className="flex items-center gap-2">
              <span className={cn("size-2 rounded-full shrink-0", STATUS_DOT_COLOR[s])} />
              {STATUS_LABELS[s]}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
