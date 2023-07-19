import { AppointmentRepository } from '@/repositories/appointment-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { UserRepository } from '@/repositories/user-repository';


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

		if (!AppointmentExists || !user || !patient) {
			throw new ResourceNotFoundError();
		}

		if (user.id !== patient.user_id) {
			throw new InvalidUserError();
		}

		if (AppointmentExists.patient_id !== patientId) {
			throw new InvalidUserError();
		}

		await this.appointmentRepository.delete(appointmentId);
	}
}