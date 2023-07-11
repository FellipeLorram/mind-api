import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../user-repository';

export class InMemoryUsersRepository implements UserRepository {
	private users: User[];

	constructor() {
		this.users = [];
	}
	async create(data: Prisma.UserCreateInput) {
		const user: User = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.users.length + 1),
		};
		this.users.push(user);

		return user;
	}

	async findByEmail(email: string) {
		const user = this.users.find((user) => user.email === email);
		return user || null;
	}

	async findById(id: string) {
		const user = this.users.find((user) => user.id === id);
		return user || null;
	}
} 