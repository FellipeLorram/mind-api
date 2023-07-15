import { beforeEach, describe, expect, it } from 'vitest';
import { AuthenticateUserUseCase } from '../authenticate';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { hash } from 'bcryptjs';
import { InavalidCredentialsError } from '../errors/invalid-credentials-error';

let sut: AuthenticateUserUseCase;
let userRepository: InMemoryUsersRepository;

describe('Authenticate User Use Case', () => {
	beforeEach(() => {
		userRepository = new InMemoryUsersRepository();
		sut = new AuthenticateUserUseCase(userRepository);
	});

	it('should authenticate a user', async () => {
		const email = 'johndoe@example.com';

		await userRepository.create({
			name: 'John Doe',
			email,
			password: await hash('123456', 6)
		});

		const { user } = await sut.execute({
			email,
			password: '123456'
		});

		expect(user).toBeDefined();
	});

	it('should not authenticate a user with wrong email', async () => {
		await expect(() => sut.execute({
			email: 'johndoe@example.com',
			password: '123456'
		})).rejects.toBeInstanceOf(InavalidCredentialsError);

	});

	it('should not authenticate a user with wrong password', async () => {
		const email = 'johndoe@example.com';

		await userRepository.create({
			name: 'John Doe',
			email,
			password: await hash('123456', 6)
		});

		await expect(() => sut.execute({
			email,
			password: 'wrong-password'
		})).rejects.toBeInstanceOf(InavalidCredentialsError);

	});
});
