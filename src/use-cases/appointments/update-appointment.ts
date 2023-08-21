import { AppointmentRepository } from '@/repositories/appointment-repository';
import { UserRepository } from '@/repositories/user-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';

interface UpdateData {
	appointment_time: Date;
}


interface UpdateAppointmentsUseCaseRequest {
	userId: string;
	patientId: string;
	appointmentId: string;
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
		const { userId, patientId, appointmentId, data: updateData } = data;

		const appointmentExists = await this.appointmentRepository.findById(appointmentId);
		if (!appointmentExists) {
			throw new ResourceNotFoundError();
		}

		const user = await this.usersRepository.findById(userId);
		if (!user) {
			throw new ResourceNotFoundError();
		}

		const patient = await this.patientsRepository.findById(patientId);
		if (!patient) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.update(appointmentId, {
			appointment_time: updateData.appointment_time
		});

		return {
			appointment: appointment
		};
	}
}