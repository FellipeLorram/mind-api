import { beforeEach, describe, expect, it } from 'vitest';
import { UpdateAppointmentNoteUseCase } from './update-appointment-note';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryNotesRepository } from '@/repositories/in-memory/in-memory-notes-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

let sut: UpdateAppointmentNoteUseCase;
let appointmentId: string;
let noteId: string;
let userId: string;

describe('Update appointment note', () => {
	beforeEach(async () => {
		const appointmentNotesRepository = new InMemoryNotesRepository();
		const appointmentsRepository = new InMemoryAppointmentsRepository();
		const usersRepository = new InMemoryUsersRepository();

		sut = new UpdateAppointmentNoteUseCase(
			appointmentNotesRepository,
			appointmentsRepository,
			usersRepository
		);

		const user = await usersRepository.create({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});


		const appointment = await appointmentsRepository.create({
			patient_id: '1',
		});

		const note = await appointmentNotesRepository.create({
			content: 'Note 1',
			appointment_id: appointment.id,
		});

		appointmentId = appointment.id;
		noteId = note.id;
		userId = user.id;
	});

	it('should be able update to a note', async () => {
		const { note } = await sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId,
			patientId: '1',
			userId,
		});

		expect(note.content).toBe('Note 2');
	});

	it('should not be able to update a non-existing note', async () => {
		await expect(() => sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId: 'invalid-id',
			patientId: '1',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid appointment id', async () => {
		await expect(() => sut.execute({
			appointmentId: 'invalid-id',
			content: 'Note 2',
			noteId,
			patientId: '1',
			userId,
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});

	it('should not be able to update a note with an invalid user id', () => {
		expect(() => sut.execute({
			appointmentId,
			content: 'Note 2',
			noteId,
			patientId: '1',
			userId: 'invalid-id',
		})).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
