"use client";

import { api } from "~/trpc/react";
import NoteCard from "./cards/note-card";
import { Button } from "./ui/button";

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
        <Button
          type="submit"
          disabled={createNote.isPending}
          className="w-full"
        >
          {createNote.isPending ? "Loading..." : "New Note"}
        </Button>
      </form>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
