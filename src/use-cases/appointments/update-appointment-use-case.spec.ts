import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { Patient } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { UpdateAppointmentsUseCase } from './update-appointment';

let sut: UpdateAppointmentsUseCase;
let patientRepository: InMemoryPatientsRepository;
let appointmentRepository: InMemoryAppointmentsRepository;
let patient: Patient;
let userId: string;
let patientId: string;
let appointmentId: string;
const appointmentDate = new Date();

describe('Update Patient Use Case', () => {
	beforeEach(async () => {
		const userRepository = new InMemoryUsersRepository();
		patientRepository = new InMemoryPatientsRepository();
		appointmentRepository = new InMemoryAppointmentsRepository();
		sut = new UpdateAppointmentsUseCase(
			appointmentRepository,
			userRepository,
			patientRepository
		);

		const user = await userRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		userId = user.id;

		patient = await patientRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			age: 20,
			appointment_duration: 30,
			address: 'Rua 1',
			appointment_time: new Date(),
			modality: 'Presencial',
			user_id: user.id,
		});

		const appointment = await appointmentRepository.create({
			patient_id: patient.id,
			appointment_time: appointmentDate,
		});

		patientId = patient.id;
		appointmentId = appointment.id;
	});

	it('should be able to update an appointment', async () => {
		const { appointment } = await sut.execute({
			userId,
			patientId,
			appointmentId,
			data: {
				appointment_time: new Date(
					new Date().setHours(new Date().getHours() + 1)
				),
			}
		});

		expect(appointment?.appointment_time).not.toBe(appointmentDate);
	});

	it('should not be able to update an appointment if patient does not exists', async () => {
		await expect(() => sut.execute({
			userId,
			patientId: 'invalid-id',
			appointmentId,
			data: {
				appointment_time: new Date(
					new Date().setHours(new Date().getHours() + 1)
				),
			}
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update an appointment if user is not the owner', async () => {
		await expect(() => sut.execute({
			userId: 'invalid-id',
			patientId,
			appointmentId,
			data: {
				appointment_time: new Date(
					new Date().setHours(new Date().getHours() + 1)
				),
			}
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update an appointment if appointment does not exists', async () => {
		await expect(() => sut.execute({
			userId,
			patientId,
			appointmentId: 'invalid-id',
			data: {
				appointment_time: new Date(
					new Date().setHours(new Date().getHours() + 1)
				),
			}
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	// it('should not be able update patient if user is not authenticated', () => {
	// 	expect(1).toBe(1);
	// });
});
