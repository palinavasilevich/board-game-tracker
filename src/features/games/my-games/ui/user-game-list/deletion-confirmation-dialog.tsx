import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alert-dialog";
import { Button } from "@/src/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";

type DeletionConfirmationDialogProps = {
  gameName: string;
  isRemovePending: boolean;
  onRemove: () => void;
};

export function DeletionConfirmationDialog({
  gameName,
  isRemovePending,
  onRemove,
}: DeletionConfirmationDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 text-muted-foreground hover:text-destructive"
          disabled={isRemovePending}
        >
          {isRemovePending ? (
            <Loader2Icon className="size-4 animate-spin" />
          ) : (
            <Trash2Icon className="size-4 text-red-400" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove game</AlertDialogTitle>
          <AlertDialogDescription>
            Remove &ldquo;{gameName}&rdquo; from your collection? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction variant="destructive" onClick={onRemove}>
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
