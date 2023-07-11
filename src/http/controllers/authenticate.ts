import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { AuthenticateUserUseCase } from '@/use-cases/authenticate';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { InavalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
	const authenticateSchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password } = authenticateSchema.parse(req.body);

	const authenticateUserUseCase = new AuthenticateUserUseCase(
		new PrismaUserRepository()
	);

	try {
		await authenticateUserUseCase.execute({
			email,
			password,
		});
	} catch (error) {
		if (error instanceof InavalidCredentialsError) {
			return res.status(400).send({
				message: error.message,
			});
		}

		return res.status(500).send({
			message: 'Internal server error',
		});
	}


	return res.status(200).send();
}
