import { AppointmentNoteRepository } from '@/repositories/appointment-note-repository';
import { PatientRepository } from '@/repositories/patient-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Note } from '@prisma/client';

interface ListAppointmentNotesRequest {
	appointmentId: string;
	page: number;
}

interface ListAppointmentNotesResponse {
	notes: Note[];
}

export class ListAppointmentNotesUseCase {
	constructor(
		private AppointmentNotesRepository: AppointmentNoteRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository,	
	) { }
	async execute(data: ListAppointmentNotesRequest) : Promise<ListAppointmentNotesResponse> {
		const notes = await this.AppointmentNotesRepository.list(
			data.appointmentId,
			data.page
		);

		return {
			notes,
		};
	}
}