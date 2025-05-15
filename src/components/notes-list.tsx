"use client";

import { api } from "~/trpc/react";
import NoteCard from "./cards/note-card";

export default function NotesList() {
  const [notes] = api.note.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote.mutate();
        }}
      >
        <button
          type="submit"
          disabled={createNote.isPending}
          className="rounded-md px-4 py-2.5 font-semibold tracking-tight hover:cursor-pointer disabled:opacity-50 "
        >
          {createNote.isPending ? "Loading..." : "New Note"}
        </button>
      </form>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
