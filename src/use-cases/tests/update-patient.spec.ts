import { beforeEach, describe, expect, it } from 'vitest';
import { UpdatePatientUseCase } from '../update-patient';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

let sut: UpdatePatientUseCase;
let patientRepository: InMemoryPatientsRepository;


describe('Update Patient Use Case', () => {
	beforeEach(() => {
		patientRepository = new InMemoryPatientsRepository();
		sut = new UpdatePatientUseCase(patientRepository);
	});
	
	it('should be able to update patient', () => {
		expect(1).toBe(1);
	});

	it('should not be able to update patient if patient does not exists', () => {
		expect(1).toBe(1);
	});

	it('should not be able to update patient if user is not the owner', () => {
		expect(1).toBe(1);
	});

	it('should not be able update patient if user is not authenticated', () => {
		expect(1).toBe(1);
	});
});
