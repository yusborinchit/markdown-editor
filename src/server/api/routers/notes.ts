import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { notes } from "~/server/db/schema";

export const noteRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    await ctx.db.insert(notes).values({
      userId: ctx.session.user.id,
    });
  }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(notes)
        .where(
          and(eq(notes.id, input.id), eq(notes.userId, ctx.session.user.id)),
        );
    }),
  writeNote: protectedProcedure
    .input(z.object({ id: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(notes)
        .set({ content: input.content })
        .where(
          and(eq(notes.id, input.id), eq(notes.userId, ctx.session.user.id)),
        );
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const notes = await ctx.db.query.notes.findMany({
      where: (notes, { eq }) => eq(notes.userId, ctx.session.user.id),
      orderBy: (notes, { desc }) => [desc(notes.createdAt)],
    });
    return notes ?? null;
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const note = await ctx.db.query.notes.findFirst({
        where: (notes, { eq, and }) =>
          and(eq(notes.id, input.id), eq(notes.userId, ctx.session.user.id)),
      });
      return note ?? null;
    }),
});
