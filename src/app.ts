import fastify from 'fastify';
import { router } from './http/router';
import { ZodError } from 'zod';
import { env } from './env';

export const app = fastify();

app.register(router);

app.setErrorHandler((error, _, reply) => {
	if(error instanceof ZodError) {
		reply.status(400).send({
			message: 'Validation error',
			errors: error.format(),
		});
	}

	if(env.NODE_ENV === 'dev') {
		console.error(error);
	} else {
		// TODO: Log to external service
	}

	reply.status(500).send({
		message: 'Internal server error',
	});
});
