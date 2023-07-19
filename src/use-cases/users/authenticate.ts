import { UserRepository } from '@/repositories/user-repository';
import { compare } from 'bcryptjs';
import { InavalidCredentialsError } from '../errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface AuthenticateUserUseCaseRequest {
	email: string;
	password: string;
}

interface AuthenticateUserUseCaseResponse {
	user: User;
}

export class AuthenticateUserUseCase {
	constructor(private userRepository: UserRepository) { }

	async execute({ email, password }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InavalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, user.password);

		if (!doesPasswordMatches) {
			throw new InavalidCredentialsError();
		}

		return {
			user
		};
	}
}
