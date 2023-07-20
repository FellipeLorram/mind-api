import { DetachedNote } from '@prisma/client';
import { UserRepository } from '@/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { DetachedNoteRepository } from '@/repositories/detached-note-repository';

interface UpdateDetachedNoteUseCaseRequest {
	content: string;
	patientId: string;
	userId: string;
}

interface UpdateDetachedNoteUseCaseResponse {
	note: DetachedNote;
}

export class UpdateDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: UpdateDetachedNoteUseCaseRequest): Promise<UpdateDetachedNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);
		const noteExists = await this.notesRepository.findById(data.patientId);

		if (!user || !patient || !noteExists) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.update(data.patientId, {
			content: data.content,
		});

		return {
			note
		};
	}
}
