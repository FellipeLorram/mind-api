import { AppointmentRepository } from '@/repositories/appointment-repository';
import { Note } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { NoteRepository } from '@/repositories/note-repository';
import { UserRepository } from '@/repositories/user-repository';

interface UpdateAppointmentNoteUseCaseRequest {
	appointmentId: string;
	patientId: string;
	userId: string;
	noteId: string;
	content: string;
}

interface UpdateAppointmentNoteUseCaseResponse {
	note: Note;
}

export class UpdateAppointmentNoteUseCase {
	constructor(
		private noteRepository: NoteRepository,
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository
	) { }

	async execute(data: UpdateAppointmentNoteUseCaseRequest): Promise<UpdateAppointmentNoteUseCaseResponse> {
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const noteExists = await this.noteRepository.findById(data.noteId);
		const user = await this.usersRepository.findById(data.userId);

		if (!appointment || !noteExists || !user) {
			throw new ResourceNotFoundError();
		}

		const note = await this.noteRepository.update(data.noteId, {
			content: data.content,
		});

		return {
			note
		};
	}
}
