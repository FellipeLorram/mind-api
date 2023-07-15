import { PatientRepository } from '@/repositories/patient-repository';
import { Patient } from '@prisma/client';

interface UpdatePatientUseCaseRequest {
	patientId: string;
	name: string
	address?: string | null
	age?: number
	email?: string | null
	gender?: string | null
	observation?: string | null
	nationality?: string | null
	birthDate?: Date | string
	modality: string | null
	appointment_duration?: number 
	appointment_time?: Date | string 
}

interface UpdatePatientUseCaseResponse {
	patient: Patient;
}

export class UpdatePatientUseCase {
	constructor(
		private patientRepository: PatientRepository,
	) { }

	async execute(data: UpdatePatientUseCaseRequest): Promise<UpdatePatientUseCaseResponse> {
		const patient = await this.patientRepository.update(data.patientId, {
			name: data.name,
			address: data.address,
			age: data.age,
			email: data.email,
			appointment_duration: data.appointment_duration,
			appointment_time: data.appointment_time,
			birthDate: data.birthDate,
		});

		return {
			patient
		};

	}
}