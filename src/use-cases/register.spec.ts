import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { compare } from 'bcryptjs';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
	it('should register a new user', async () => {
		const registerUseCase = new RegisterUseCase(
			new InMemoryUsersRepository()
		);

		const { user } = await registerUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		expect(user).toBeTruthy();
	});

	it('should hash user password upon registration', async () => {
		const registerUseCase = new RegisterUseCase(
			new InMemoryUsersRepository()
		);

		const { user } = await registerUseCase.execute({
			name: 'John Doe',
			email: 'johndoe@example.com',
			password: '123456',
		});

		const isPasswordHashed = await compare('123456', user.password);

		expect(isPasswordHashed).toBe(true);
	});

	it('should not register a user with an existing email', async () => {
		const registerUseCase = new RegisterUseCase(
			new InMemoryUsersRepository()
		);

		const email = 'johndoe@example.com';

		await registerUseCase.execute({
			name: 'John Doe',
			email,
			password: '123456',
		});


		await expect(() => registerUseCase.execute({
			name: 'John Doe',
			email,
			password: '123456',
		})).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});


});
