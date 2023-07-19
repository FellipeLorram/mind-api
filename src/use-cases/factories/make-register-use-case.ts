import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from '../users/register';

export function MakeRegisterUseCase() {
	return new RegisterUseCase(
		new PrismaUserRepository(),
	);
}