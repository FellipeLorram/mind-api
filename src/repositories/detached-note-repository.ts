import { DetachedNote, Prisma } from '@prisma/client';

export interface DetachedNoteRepository {
	findById(id: string): Promise<DetachedNote | null>;
	create(Note: Prisma.DetachedNoteUncheckedCreateInput): Promise<DetachedNote>;
	update(noteid: string, note: Prisma.NoteUncheckedUpdateInput): Promise<DetachedNote>;
	// delete(id: string): Promise<void>;
}
