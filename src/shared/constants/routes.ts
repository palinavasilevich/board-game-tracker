export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MY_GAMES: "/my-games",
  FRIENDS: "/friends",
  USER: (id: string) => `/users/${id}`,
} as const;
