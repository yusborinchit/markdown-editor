import { auth } from "~/server/auth";

export async function getProtectedSession() {
  const session = await auth();
  if (!session?.user) throw new Error("No session");
  return session;
}
