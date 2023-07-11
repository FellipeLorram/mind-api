import { UserRepository } from '@/repositories/user-repository';
import { InavalidCredentialsError } from './errors/invalid-credentials-error';
import { User } from '@prisma/client';

interface GetUserProfileUseCaseRequest {
	email: string;
}

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private userRepository: UserRepository) { }

	async execute({ email }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new InavalidCredentialsError();
		}

		return {
			user
		};
	}
}
