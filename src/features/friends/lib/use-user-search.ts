"use client";

import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/src/shared/lib/use-debounce";

export type UserSearchResult = {
  id: string;
  name: string;
  avatarUrl: string | null;
  isFollowing: boolean;
};

async function searchUsers(q: string): Promise<{ users: UserSearchResult[] }> {
  const res = await fetch(`/api/users/search?q=${encodeURIComponent(q)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useUserSearch(query: string) {
  const debouncedQuery = useDebounce(query, 300);

  const { data, isFetching } = useQuery({
    queryKey: ["user-search", debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    placeholderData: (prev) => prev,
  });

  return {
    results: data?.users ?? [],
    isSearching: isFetching,
    hasQuery: debouncedQuery.length >= 2,
  };
}
