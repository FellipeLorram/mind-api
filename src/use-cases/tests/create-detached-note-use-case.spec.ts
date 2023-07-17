import { describe } from 'node:test';
import { beforeEach, expect, it } from 'vitest';
import { CreateDetachedNoteUseCase } from '../create-detached-note';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { InMemoryDetachedNotesRepository } from '@/repositories/in-memory/in-memory-detached-notes-repository';

let sut: CreateDetachedNoteUseCase;
let userId: string;
let patientId: string;

describe('Create Note Use Case', () => {
	beforeEach(async () => {
		const noteRepository = new InMemoryDetachedNotesRepository();
		const patientRepository = new InMemoryPatientsRepository();
		const userRepository = new InMemoryUsersRepository();

		sut = new CreateDetachedNoteUseCase(
			noteRepository,
			userRepository,
			patientRepository
		);

		const user = await userRepository.create({
			name: 'any_name',
			email: 'any_email@example.com',
			password: 'any_password',
		});

		userId = user.id;

		const patient = await patientRepository.create({
			user_id:user.id,
			age: 10,
			name: 'john doe',
			appointment_duration: 30,
			appointment_time: new Date(),
			modality: 'Presencial'
		});

		patientId = patient.id;
	});

	it('should be able to create a note', async () => {
		const note = await sut.execute({
			patientId,
			content: 'any_content',
			userId,
		});
		
		expect(note).toBeDefined();
	});

	// it('should not be able to create a note with invalid patient id', () => {
	// 	expect(true).toBe(true);
	// });

	// it('should not be able to create a note with invalid user id', () => {
	// 	expect(true).toBe(true);
	// });
});
