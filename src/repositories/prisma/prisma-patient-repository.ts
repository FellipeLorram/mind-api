import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prismaClient';
import { PatientRepository } from '../patient-repository';

export class PrismaPatientRepository implements PatientRepository {
	findById(id: string) {
		const patient = prisma.patient.findUnique({
			where: {
				id,
			},
		});

		return patient;
	}

	async create(data: Prisma.PatientUncheckedCreateInput) {
		const patient = await prisma.patient.create({
			data,
		});

		return patient;
	}

	async update(patientId: string, data: Prisma.PatientUncheckedUpdateInput) {
		const patient = await prisma.patient.update({
			where: {
				id: patientId,
			},
			data,
		});

		return patient;
	}

	async delete(id: string) {
		await prisma.patient.delete({
			where: {
				id,
			},
		});
	}

	async list(userId: string, page: number, query: string) {
		const patients = await prisma.patient.findMany({
			where: {
				user_id: userId,
				OR: [
					{
						name: {
							contains: query,
						},
					},
					{
						email: {
							contains: query,
						},
					},
				],
			},
			skip: (page - 1) * 10,
			take: 10,
		});

		return patients;
	}
}
