import { Note, Prisma } from '@prisma/client';

export interface AppointmentNoteRepository {
	findById(id: string): Promise<Note | null>;
	create(Note: Prisma.NoteUncheckedCreateInput): Promise<Note>;
	update(noteid: string, note: Prisma.NoteUncheckedUpdateInput): Promise<Note>;
	// delete(id: string): Promise<void>;
	list(appointmentId: string, page: number): Promise<Note[]>;
}
