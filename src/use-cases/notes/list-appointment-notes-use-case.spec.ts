import { beforeEach, describe, expect, it } from 'vitest';
import { ListAppointmentNotesUseCase } from './list-appointment-notes';
import { InMemoryAppointmentNotesRepository } from '@/repositories/in-memory/in-memory-notes-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

let sut: ListAppointmentNotesUseCase;

describe('List Appointment Notes Use Case', () => {
	beforeEach(async () => {
		const appointmentNoteRepository = new InMemoryAppointmentNotesRepository();
		const usersRepository = new InMemoryUsersRepository();
		const patientsRepository = new InMemoryPatientsRepository();

		sut = new ListAppointmentNotesUseCase(
			appointmentNoteRepository,
			usersRepository,
			patientsRepository,
		); 

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

	});

	it('should list all appointment notes', async () => {
		expect(1).toBe(1);
	});

	// it('should list appointment notes with pagination', async () => {
	// 	expect(1).toBe(1);
	// });

	// it('should not be able to list appointment notes with invalid page', async () => {
	// 	expect(1).toBe(1);
	// });

	// it('should not be able to list appointment notes with invalid appointment', async () => {
	// 	expect(1).toBe(1);
	// });

	// it('should not be able to list appointment notes with invalid user', async () => {
	// 	expect(1).toBe(1);
	// });

	// it('should not be able to list appointment notes with invalid patient', async () => {
	// 	expect(1).toBe(1);
	// });
});
