import { auth } from "@/auth";
import { User as AuthUser } from "next-auth";

type WithAuthProps = {
  user?: AuthUser;
};

export default function withAuth<T extends WithAuthProps>(
  Component: React.ComponentType<T>,
) {
  const ComponentWithAuth = async (props: Omit<T, keyof WithAuthProps>) => {
    const session = await auth();

    if (!session?.user?.id) {
      return <Component {...(props as T)} />;
    }

    return <Component user={session.user} {...(props as T)} />;
  };

  ComponentWithAuth.displayName = `withAuth(${Component.displayName ?? Component.name})`;

  return ComponentWithAuth;
}
