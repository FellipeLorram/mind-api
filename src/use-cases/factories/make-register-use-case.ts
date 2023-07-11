import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { RegisterUseCase } from '../register';

export function MakeRegisterUseCase() {
	return new RegisterUseCase(
		new PrismaUserRepository(),
	);
}