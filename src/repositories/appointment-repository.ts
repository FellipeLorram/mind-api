import { Appointment, Prisma } from '@prisma/client';

export interface AppointmentRepository {
	// findById(id: string): Promise<Note | null>;
	create(Note: Prisma.AppointmentUncheckedCreateInput): Promise<Appointment>;
	// update(Noteid: string, Note: Prisma.NoteUncheckedUpdateInput): Promise<Note>;
	// delete(id: string): Promise<void>;
}
