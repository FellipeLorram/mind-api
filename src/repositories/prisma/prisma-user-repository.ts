import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prismaClient';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
	findById(id: string) {
		const user = prisma.user.findUnique({
			where: {
				id,
			},
		});

		return user;
	}

	async create(data: Prisma.UserCreateInput) {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}

	async findByEmail(email: string) {
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}
