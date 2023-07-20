import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { DeletePatientUseCase } from './delete-patient';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { PatientRepository } from '@/repositories/patient-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InvalidUserError } from '../errors/invalid-user-error';

let sut: DeletePatientUseCase;
let patientId: string;
let userId: string;
let patientRepository: PatientRepository;

describe('Delete Patient Use Case', () => {
	beforeEach(async () => {
		patientRepository = new InMemoryPatientsRepository();
		sut = new DeletePatientUseCase(patientRepository);
		const userRepository = new InMemoryUsersRepository();

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		userId = user.id;

		const { id } = await patientRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			age: 20,
			appointment_duration: 30,
			address: 'Rua 1',
			appointment_time: new Date(),
			modality: 'Presencial',
			user_id: user.id,
		});

		patientId = id;
	});

	it('should be able to delete a patient', async () => {
		await sut.execute({
			userId,
			patientId,
		});

		const patient = await patientRepository.findById(patientId);

		expect(patient).toBeNull();
	});

	it('should not be able to delete a patient with invalid id', () => {
		expect(async () => {
			await sut.execute({
				userId,
				patientId: 'invalid-id',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a patient if user is not the owner', () => {
		expect(async () => {
			await sut.execute({
				userId: 'invalid-user-id',
				patientId,
			});
		}).rejects.toBeInstanceOf(InvalidUserError);
	});
});
