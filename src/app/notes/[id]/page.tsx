import Link from "next/link";
import { Suspense } from "react";
import AuthContainer from "~/components/containers/auth-container";
import MainContainer from "~/components/containers/main-container";
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
          <main className="flex min-h-screen flex-col gap-6">
            <Link href="/">Home</Link>
            {/* TODO: Add an actual skeleton fallback component */}
            <Suspense fallback={<p>Cargando nota...</p>}>
              <NoteEditor id={id} />
            </Suspense>
          </main>
        </MainContainer>
      </HydrateClient>
    </AuthContainer>
  );
}
