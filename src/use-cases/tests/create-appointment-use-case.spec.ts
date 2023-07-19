import { beforeEach, describe, expect, it } from 'vitest';
import { CreateAppointmentUseCase } from '../appointments/create-appointment';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';

let sut: CreateAppointmentUseCase;
let userId: string;
let patientId: string;

describe('Create Appointment Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new CreateAppointmentUseCase(
			patientRepository,
			userRepository,
			appointmentRepository,
		);

		const user = await userRepository.create({
			name: 'any_name',
			email: 'any_email@email.com',
			password: 'any_password',
		});

		const patient = await patientRepository.create({
			user_id: user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		userId = user.id;
		patientId = patient.id;
	});

	it('should create a new appointment', async () => {
		const appointment = await sut.execute({
			patientId,
			userId,
		});

		expect(appointment).toBeDefined();
	});

	// it('should not create a new appointment with invalid user', async () => {
	// });

	// it('should not create a new appointment with invalid patient', async () => {
	// });

	// it('should not create a new appointment with invalid date', async () => {
	// });

	// it('should not create a new appointment with invalid time', async () => {
	// });
});

