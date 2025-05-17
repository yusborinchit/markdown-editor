import { Suspense } from "react";
import AuthContainer from "~/components/containers/auth-container";
import MainContainer from "~/components/containers/main-container";
import Header from "~/components/header";
import NoteEditor from "~/components/note-editor";
import { api, HydrateClient } from "~/trpc/server";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Note({ params }: Readonly<Props>) {
  const { id } = await params;

  void api.note.getById.prefetch({ id });

  return (
    <AuthContainer>
      <HydrateClient>
        <MainContainer>
          <Header />
          <main className="flex flex-col gap-6">
            <Suspense fallback={<p>Cargando nota...</p>}>
              <NoteEditor id={id} />
            </Suspense>
          </main>
        </MainContainer>
      </HydrateClient>
    </AuthContainer>
  );
}
