import { Note, Prisma } from '@prisma/client';
import { AppointmentNoteRepository } from '../appointment-note-repository';

export class InMemoryAppointmentNotesRepository implements AppointmentNoteRepository {
	private notes: Note[];

	constructor() {
		this.notes = [];
	}

	async create(data: Prisma.NoteUncheckedCreateInput) {
		const Note: Note = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.notes.length + 1),
		};

		this.notes.push(Note);

		return Note;
	}

	async update(id: string, Note: Prisma.NoteUncheckedUpdateInput) {
		const noteIndex = this.notes.findIndex((n) => n.id === id);

		if (noteIndex < 0) {
			throw new Error('Note not found');
		}

		this.notes[noteIndex] = {
			...this.notes[noteIndex],
			content: Note.content ? Note.content as string : this.notes[noteIndex].content,
		};

		return this.notes[noteIndex];
	}

	// async delete(id: string) {
	// 	const NoteIndex = this.Notes.findIndex((Note) => Note.id === id);

	// 	if (NoteIndex < 0) {
	// 		throw new Error('Note not found');
	// 	}

	// 	this.Notes.splice(NoteIndex, 1);
	// }

	async list(appointmentId: string, page: number) {
		const notes = this.notes.filter((n) => n.appointment_id === appointmentId);

		const offset = (page - 1) * 20;
		const limit = 20;

		return notes.slice(offset, offset + limit);
	}

	async findById(id: string) {
		const Note = this.notes.find((n) => n.id === id);
		return Note || null;
	}
} 