import { AppointmentRepository } from '@/repositories/appointment-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { UserRepository } from '@/repositories/user-repository';
import { InvalidPatientError } from '../errors/invalid-patient-error';


interface DeleteAppointmentUseCaseRequest {
	userId: string;
	patientId: string;
	appointmentId: string;
}

export class DeleteAppointmentUseCase {
	constructor(
		private appointmentRepository: AppointmentRepository,
		private patientRepository: PatientRepository,
		private userRepository: UserRepository,
	) { }

	async execute({ userId, appointmentId, patientId }: DeleteAppointmentUseCaseRequest): Promise<void> {
		const AppointmentExists = await this.appointmentRepository.findById(appointmentId);
		const user = await this.appointmentRepository.findById(userId);
		const patient = await this.patientRepository.findById(patientId);

		if (
			!AppointmentExists
			|| !user
			|| !patient
			|| user.id !== patient.user_id
		) {
			throw new ResourceNotFoundError();
		}

		if (AppointmentExists.patient_id !== patientId) {
			throw new InvalidPatientError();
		}

		await this.appointmentRepository.delete(appointmentId);
	}
}