import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

interface Props {
  children: React.ReactNode;
}

export default async function ProtectedWrapper({ children }: Readonly<Props>) {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return <>{children}</>;
}
