import { Note, Prisma } from '@prisma/client';
import { NoteRepository } from '../note-repository';

export class InMemoryNotesRepository implements NoteRepository {
	private Notes: Note[];

	constructor() {
		this.Notes = [];
	}

	async create(data: Prisma.NoteUncheckedCreateInput) {
		const Note: Note = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.Notes.length + 1),
		};

		this.Notes.push(Note);

		return Note;
	}

	// async update(id: string, Note: Prisma.NoteUncheckedUpdateInput) {
	// 	const NoteIndex = this.Notes.findIndex((Note) => Note.id === id);

	// 	if (NoteIndex < 0) {
	// 		throw new Error('Note not found');
	// 	}

	// 	this.Notes[NoteIndex] = {
	// 		...this.Notes[NoteIndex],
	// 		address: Note.address ? Note.address as string : this.Notes[NoteIndex].address,
	// 		age: Note.age ? Note.age as number : this.Notes[NoteIndex].age,
	// 		appointment_duration: Note.appointment_duration ? Note.appointment_duration as number : this.Notes[NoteIndex].appointment_duration,
	// 		appointment_time: Note.appointment_time ? new Date(Note.appointment_time as string) : this.Notes[NoteIndex].appointment_time,
	// 		email: Note.email ? Note.email as string : this.Notes[NoteIndex].email,
	// 		name: Note.name ? Note.name as string : this.Notes[NoteIndex].name,
	// 		birthDate: Note.birthDate ? new Date(Note.birthDate as string) : this.Notes[NoteIndex].birthDate,
	// 		gender: Note.gender ? Note.gender as string : this.Notes[NoteIndex].gender,
	// 		modality: Note.modality ? Note.modality as string : this.Notes[NoteIndex].modality,
	// 		nationality: Note.nationality ? Note.nationality as string : this.Notes[NoteIndex].nationality,
	// 		observation: Note.observation ? Note.observation as string : this.Notes[NoteIndex].observation,
	// 	};

	// 	return this.Notes[NoteIndex];
	// }

	// async delete(id: string) {
	// 	const NoteIndex = this.Notes.findIndex((Note) => Note.id === id);

	// 	if (NoteIndex < 0) {
	// 		throw new Error('Note not found');
	// 	}

	// 	this.Notes.splice(NoteIndex, 1);
	// }

	// async findById(id: string) {
	// 	const Note = this.Notes.find((Note) => Note.id === id);
	// 	return Note || null;
	// }
} 