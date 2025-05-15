"use client";

import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "use-debounce";
import { api } from "~/trpc/react";

interface Props {
  id: string;
}

export default function NoteEditor({ id }: Readonly<Props>) {
  const [note] = api.note.getById.useSuspenseQuery({ id });
  if (!note) throw new Error("Note not found");

  const [isPreview, setIsPreview] = useState(false);
  const [content, setContent] = useState(note.content ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [debouncedContent] = useDebounce(content, 500);

  const utils = api.useUtils();
  const writeNote = api.note.writeNote.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
    },
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: writeNote is stable
  useEffect(() => {
    if (debouncedContent === note.content) return;
    setIsSaving(true);
    writeNote.mutate(
      { id, content: debouncedContent },
      { onSuccess: () => setIsSaving(false) },
    );
  }, [debouncedContent, id, note.content]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex items-center justify-between">
        {isSaving ? (
          <p>Saving...</p>
        ) : (
          <p>
            Last saved:{" "}
            {note.updatedAt?.toLocaleTimeString("es", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        <button
          type="button"
          onClick={() => setIsPreview((p) => !p)}
          className="rounded-md bg-black px-3 py-1.5 font-semibold text-sm text-white tracking-tight hover:cursor-pointer disabled:opacity-50"
        >
          {isPreview ? "Edit" : "Preview"}
        </button>
      </div>
      {isPreview ? (
        <div className="prose prose-sm sm:prose-base prose-neutral">
          <Markdown>{content}</Markdown>
        </div>
      ) : (
        <TextareaAutosize
          onChange={(e) => setContent(e.target.value)}
          minRows={12}
          value={content}
          className="resize-none rounded-md border font-mono"
        />
      )}
    </div>
  );
}
