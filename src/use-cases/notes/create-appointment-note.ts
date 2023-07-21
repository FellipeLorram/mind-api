import { Note } from '@prisma/client';
import { UserRepository } from '@/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { AppointmentNoteRepository } from '@/repositories/appointment-note-repository';
import { AppointmentRepository } from '@/repositories/appointment-repository';

interface CreateAppointmentNoteUseCaseRequest {
	content: string;
	patientId: string;
	appointmentId: string;
	userId: string;
}

interface CreateAppointmentNoteUseCaseResponse {
	note: Note;
}

export class CreateAppointmentNoteUseCase {
	constructor(
		private notesRepository: AppointmentNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: CreateAppointmentNoteUseCaseRequest): Promise<CreateAppointmentNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const appointment = await this.appointmentRepository.findById(data.appointmentId);

		if (!user || !patient || !appointment) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.create({
			content: data.content,
			appointment_id: data.appointmentId,
		});

		return {
			note
		};
	}
}
