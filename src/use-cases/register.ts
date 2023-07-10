import { Prisma, User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { UserRepository } from '@/repositories/user-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

interface RegisterUseCaseResponse {
	user: User
}

export class RegisterUseCase {
	constructor(private userRepository: UserRepository) { }

	async execute(data: Prisma.UserCreateInput): Promise<RegisterUseCaseResponse> {
		const userAlreadyExists = await this.userRepository.findByEmail(data.email);

		if (userAlreadyExists) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(data.password, 6);

		const user = await this.userRepository.create({
			...data,
			password: passwordHash,
		});

		return { user };
	}
}
