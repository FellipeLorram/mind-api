import { Appointment } from '@prisma/client';
import { PatientRepository } from '@/repositories/patient-repository';
import { UserRepository } from '@/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { AppointmentRepository } from '@/repositories/appointment-repository';

interface CreateAppointmentUseCaseRequest {
	patientId: string;
	userId: string;
	date: Date;
}


interface CreateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class CreateAppointmentUseCase {
	constructor(
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
		private appointmentRepository: AppointmentRepository,
	) { }

	async execute(data: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (!user || !patient || user.id !== patient.user_id) {
			throw new ResourceNotFoundError();
		}

		const appointment = await this.appointmentRepository.create({
			appointment_time: data.date,
			...data,
			patient_id: data.patientId,
		});

		return {
			appointment
		};
	}
}
