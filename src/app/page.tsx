import SignOutButton from "~/components/auth/sign-out-button";
import AuthContainer from "~/components/containers/auth-container";
import MainContainer from "~/components/containers/main-container";
import NotesList from "~/components/notes-list";
import { HydrateClient, api } from "~/trpc/server";
import { getProtectedSession } from "~/utils/auth";

export default async function Home() {
  const session = await getProtectedSession();

  void api.note.getAll.prefetch();

  return (
    <AuthContainer>
      <HydrateClient>
        <MainContainer>
          <header className="flex items-center justify-between py-4">
            <h1 className="font-bold text-2xl tracking-tighter">
              Markdown Editor
            </h1>
            <SignOutButton />
          </header>
          <div className="flex flex-col gap-6">
            <p>Welcome back, {session.user.name}!</p>
            <NotesList />
          </div>
        </MainContainer>
      </HydrateClient>
    </AuthContainer>
  );
}
