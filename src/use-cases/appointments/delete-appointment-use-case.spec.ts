import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';

import { DeleteAppointmentUseCase } from './delete-appointment';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: DeleteAppointmentUseCase;
let patientId: string;
let userId: string;
let appointmentId: string;
let appointmentRepository: InMemoryAppointmentsRepository;

describe('Delete Appointment Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new DeleteAppointmentUseCase(
			appointmentRepository,
			patientRepository,
			userRepository
		);

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

		const appointment = await appointmentRepository.create({
			patient_id: patientId,
		});

		appointmentId = appointment.id;
	});

	it('should be able to delete a appointment', async () => {
		await sut.execute({
			userId,
			patientId,
			appointmentId,
		});

		const appointment = await appointmentRepository.findById(appointmentId);

		expect(appointment).toBeNull();
	});

	it('should not be able to delete a appointment with invalid id', async () => {
		await expect(async () => {
			await sut.execute({
				userId,
				patientId,
				appointmentId: 'invalid-id',
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a appointment with invalid user', async () => {
		await expect(async () => {
			await sut.execute({
				userId: 'invalid-id',
				patientId,
				appointmentId,
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to delete a appointment with invalid patient', () => {
		expect(async () => {
			await sut.execute({
				userId,
				patientId: 'invalid-id',
				appointmentId,
			});
		}).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
