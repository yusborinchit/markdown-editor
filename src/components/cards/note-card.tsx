"use client";

import Link from "next/link";
import type { notes } from "~/server/db/schema";
import { api } from "~/trpc/react";

interface Props {
  note: typeof notes.$inferSelect;
}

export default function NoteCard({ note }: Readonly<Props>) {
  const utils = api.useUtils();
  const deleteNote = api.note.delete.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
    },
  });

  return (
    <div className="relative flex flex-col gap-2">
      <button
        type="button"
        onClick={() => deleteNote.mutate({ id: note.id })}
        disabled={deleteNote.isPending}
        className="absolute top-4 right-4 rounded-md bg-black px-3 py-1.5 font-semibold text-sm text-white tracking-tight hover:cursor-pointer disabled:opacity-50"
      >
        {deleteNote.isPending ? "Loading..." : "Delete"}
      </button>
      <Link href={`/notes/${note.id}`}>
        <pre>
          {JSON.stringify(
            {
              id: note.id,
              title: note.title,
              createdAt: note.createdAt,
              updatedAt: note.updatedAt,
            },
            null,
            2,
          )}
        </pre>
      </Link>
    </div>
  );
}
