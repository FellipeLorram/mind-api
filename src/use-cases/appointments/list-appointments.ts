import { AppointmentRepository } from '@/repositories/appointment-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { InavalidPageError } from '../errors/invalid-page-error';

interface ListAppointmentsUseCaseRequest {
	userId: string;
	patientId: string;
	page: number;
}

interface ListAppointmentsUseCaseResponse {
	appointments: Appointment[];
}

export class ListAppointmentsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: ListAppointmentsUseCaseRequest): Promise<ListAppointmentsUseCaseResponse> {
		if(data.page < 1) throw new InavalidPageError();

		const user = await this.usersRepository.findById(data.userId);
		const patient = await this.patientsRepository.findById(data.patientId);
		const appointments = await this.appointmentRepository.list(data.patientId, data.page);

		if (
			!user
			|| !patient
		) {
			throw new ResourceNotFoundError();
		}


		return {
			appointments
		};
	}
}