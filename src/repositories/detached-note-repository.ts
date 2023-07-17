import { DetachedNote, Prisma } from '@prisma/client';

export interface DetachedNoteRepository {
	// findById(id: string): Promise<Note | null>;
	create(Note: Prisma.DetachedNoteUncheckedCreateInput): Promise<DetachedNote>;
	// update(Noteid: string, Note: Prisma.NoteUncheckedUpdateInput): Promise<Note>;
	// delete(id: string): Promise<void>;
}
