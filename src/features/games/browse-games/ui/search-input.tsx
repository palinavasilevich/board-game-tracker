"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { ButtonGroup } from "@/src/components/ui/button-group";
import { Input } from "@/src/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { Field } from "@/src/components/ui/field";
import { useDebounce } from "@/src/shared/lib/use-debounce";

export function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebounce(searchTerm, 500);
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    router.replace(`/?${params.toString()}`);
  }, [debouncedSearch, router]);

  function handleClear() {
    setSearchTerm("");
  }

  return (
    <Field>
      <ButtonGroup className="w-full max-w-md mx-auto rounded-lg">
        <Input
          id="game-search"
          placeholder="Search game..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            variant="outline"
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
          >
            <XIcon />
          </Button>
        )}
        <Button variant="outline" aria-label="Search" type="button">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </Field>
  );
}
