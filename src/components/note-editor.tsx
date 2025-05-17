"use client";

import { Eye, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { useDebounce } from "use-debounce";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

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
          <p className="text-muted">Saving...</p>
        ) : (
          <p className="text-muted">
            Last saved:{" "}
            {note.updatedAt?.toLocaleTimeString("es", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setIsPreview((p) => !p)}
        >
          {isPreview ? (
            <SquarePen aria-label="Edit" className="size-5 shrink-0" />
          ) : (
            <Eye aria-label="Preview" className="size-5 shrink-0" />
          )}
        </Button>
      </div>
      {isPreview ? (
        <div className="prose prose-invert prose-sm sm:prose-base prose-neutral prose-pre:bg-neutral-950/50 prose-li:text-neutral-400 prose-p:text-neutral-400 prose-pre:text-neutral-50 prose-strong:text-neutral-400">
          <Markdown>{content}</Markdown>
        </div>
      ) : (
        <TextareaAutosize
          onChange={(e) => setContent(e.target.value)}
          minRows={6}
          value={content}
          placeholder="Write your markdown here..."
          className="rounded-md border border-input bg-transparent px-3 py-2 font-mono text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        />
      )}
    </div>
  );
}
