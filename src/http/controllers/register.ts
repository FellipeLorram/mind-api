import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUseCase } from '@/use-cases/register';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';

export async function register(req: FastifyRequest, res: FastifyReply) {
	const registerSchema = z.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password, name } = registerSchema.parse(req.body);

	const registerUseCase = new RegisterUseCase(
		new PrismaUserRepository()
	);

	try {
		await registerUseCase.execute({
			email,
			password,
			name,
		});
	} catch (error) {
		if (error instanceof UserAlreadyExistsError) {
			return res.status(409).send({
				message: error.message,
			});
		}

		return res.status(500).send({
			message: 'Internal server error',
		});
	}


	return res.status(201).send();
}
