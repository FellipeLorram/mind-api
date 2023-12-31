import { Patient, Prisma } from '@prisma/client';

export interface PatientRepository {
	findById(id: string): Promise<Patient | null>;
	create(patient: Prisma.PatientUncheckedCreateInput): Promise<Patient>;
	update(patientid: string, patient: Prisma.PatientUncheckedUpdateInput): Promise<Patient>;
	delete(id: string): Promise<void>;
	list(userId: string, page: number, query: string): Promise<Patient[]>;
}
