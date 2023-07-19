import { AppointmentRepository } from '@/repositories/appointment-repository';
import { Appointment } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { UserRepository } from '@/repositories/user-repository';
import { InvalidPatientError } from '../errors/invalid-patient-error';

interface GetAppointmentUseCaseRequest {
	appointmentId: string;
	patientId: string;
	userId: string;
}

interface GetAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class GetAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) { }

	async execute(data: GetAppointmentUseCaseRequest): Promise<GetAppointmentUseCaseResponse> {
		const appointment = await this.appointmentRepository.findById(data.appointmentId);
		const patient = await this.patientRepository.findById(data.patientId);
		const user = await this.userRepository.findById(data.userId);

		if (!user) {
			throw new InvalidUserError();
		}

		if (!patient) {
			throw new InvalidPatientError();
		}

		if (!appointment) {
			throw new ResourceNotFoundError();
		}

		if (appointment.patient_id !== data.patientId) {
			throw new InvalidUserError();
		}

		return {
			appointment
		};
	}
}