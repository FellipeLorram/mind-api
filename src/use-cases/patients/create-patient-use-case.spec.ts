import { describe, it, expect, beforeEach } from 'vitest';
import { CreatePatientUseCase } from './create-patient';
import { PatientRepository } from '@/repositories/patient-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { UserRepository } from '@/repositories/user-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

let sut: CreatePatientUseCase;
let patientRepository: PatientRepository;
let userRepository: UserRepository;

describe('Patient Use Case', () => {
	beforeEach(() => {
		patientRepository = new InMemoryPatientsRepository();
		userRepository = new InMemoryUsersRepository();
		sut = new CreatePatientUseCase(patientRepository, userRepository);
	});

	it('should be able to create a patient', async () => {
		const user = await userRepository.create({
			name: 'john doe',
			email: 'johndoe@example.com',
			password: 'any_password'
		});

		const { patient } = await sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_duration: 10,
			appointment_time: new Date(),
			userId: user.id
		});

		expect(patient).toBeTruthy();
	});

	it('should not be able to create a patient with invalid user id', async () => {
		expect(() => sut.execute({
			name: 'any_name',
			age: 10,
			modality: 'any_modality',
			address: 'any_address',
			observation: 'any_observation',
			birthDate: new Date(),
			email: 'any_email@email.com',
			gender: 'male',
			nationality: 'any_nationality',
			appointment_duration: 10,
			appointment_time: new Date(),
			userId: 'any_user_id'
		})).rejects.toBeInstanceOf(Error);
	});
});
