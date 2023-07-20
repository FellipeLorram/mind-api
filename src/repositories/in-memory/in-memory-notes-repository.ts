import { Note, Prisma } from '@prisma/client';
import { NoteRepository } from '../note-repository';

export class InMemoryNotesRepository implements NoteRepository {
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

	async findById(id: string) {
		const Note = this.notes.find((n) => n.id === id);
		return Note || null;
	}
} 