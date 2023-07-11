import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { AuthenticateUserUseCase } from '../authenticate';

export function MakeAuthenticateUseCase() {
	return new AuthenticateUserUseCase(
		new PrismaUserRepository(),
	);
}