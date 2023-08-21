import { AppointmentRepository } from '@/repositories/appointment-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';

interface UpdateData {
	date: Date;
}


interface UpdateAppointmentsUseCaseRequest {
	userId: string;
	patientId: string;
	data: UpdateData;
}

interface UpdateAppointmentsUseCaseResponse {
	appointment: Appointment | null;
}

export class UpdateAppointmentsUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private usersRepository: UserRepository,
		private patientsRepository: PatientRepository
	) { }

	async execute(data: UpdateAppointmentsUseCaseRequest): Promise<UpdateAppointmentsUseCaseResponse> {
		const { userId, patientId, data: updateData } = data;

		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patient = await this.patientsRepository.findById(patientId);
		if (!patient) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.update(patientId, {
			appointment_time: updateData.date
		});

		return {
			appointment: appointment
		};
	}
}