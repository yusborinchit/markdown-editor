import AuthContainer from "~/components/containers/auth-container";
import MainContainer from "~/components/containers/main-container";
import Header from "~/components/header";
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
          <Header />
          <main className="flex flex-col gap-6">
            <p className="text-neutral-400">
              Welcome back, {session.user.name}!
            </p>
            <NotesList />
          </main>
        </MainContainer>
      </HydrateClient>
    </AuthContainer>
  );
}
