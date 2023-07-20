import { DetachedNote, Prisma } from '@prisma/client';
import { DetachedNoteRepository } from '../detached-note-repository';

export class InMemoryDetachedNotesRepository implements DetachedNoteRepository {
	private notes: DetachedNote[];

	constructor() {
		this.notes = [];
	}

	async create(data: Prisma.DetachedNoteUncheckedCreateInput) {
		const Note: DetachedNote = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.notes.length + 1),
		};

		this.notes.push(Note);

		return Note;
	}

	async update(id: string, note: Prisma.NoteUncheckedUpdateInput) {
		const noteIndex = this.notes.findIndex((n) => n.id === id);

		if (noteIndex < 0) {
			throw new Error('Note not found');
		}

		this.notes[noteIndex] = {
			...this.notes[noteIndex],
			content: note.content as string,
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

	async findById(id: string) {
		const note = this.notes.find((n) => n.id === id);
		return note || null;
	}
} 