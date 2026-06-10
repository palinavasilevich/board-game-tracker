"use client";

import { useQuery } from "@tanstack/react-query";

export type FriendshipItem = {
  id: string;
  following: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
};

export type FollowerItem = {
  id: string;
  follower: {
    id: string;
    name: string;
    avatarUrl: string | null;
  };
};

async function fetchFriends(): Promise<{ friendships: FriendshipItem[]; followers: FollowerItem[] }> {
  const res = await fetch("/api/friends");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useFriends() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: fetchFriends,
  });

  return {
    friendships: data?.friendships ?? [],
    followers: data?.followers ?? [],
    isLoading: isPending,
    isError,
  };
}
