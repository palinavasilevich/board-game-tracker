import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

export function SearchInput() {
  return (
    <ButtonGroup className="w-full max-w-md mx-auto rounded-lg">
      <Input id="game-search" placeholder="Search game..." />
      {/* {field.value && (
        <Button
          variant="outline"
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          disabled={isLoading}
        >
          <XIcon />
        </Button>
      )} */}
      <Button
        variant="outline"
        aria-label="Search"
        type="submit"
        // disabled={isLoading}
      >
        <SearchIcon />
      </Button>
    </ButtonGroup>
  );
}
