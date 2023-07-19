import { DetachedNote } from '@prisma/client';
import { UserRepository } from '@/repositories/user-repository';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';
import { PatientRepository } from '@/repositories/patient-repository';
import { DetachedNoteRepository } from '@/repositories/detached-note-repository';

interface CreateDetachedNoteUseCaseRequest {
	content: string;
	patientId: string;
	userId: string;
}

interface CreateDetachedNoteUseCaseResponse {
	note: DetachedNote;
}

export class CreateDetachedNoteUseCase {
	constructor(
		private notesRepository: DetachedNoteRepository,
		private userRepository: UserRepository,
		private patientRepository: PatientRepository,
	) { }

	async execute(data: CreateDetachedNoteUseCaseRequest): Promise<CreateDetachedNoteUseCaseResponse> {
		const user = await this.userRepository.findById(data.userId);
		const patient = await this.patientRepository.findById(data.patientId);

		if (!user || !patient) {
			throw new ResourceNotFoundError();
		}

		const note = await this.notesRepository.create({
			content: data.content,
			patient_id: data.patientId,
		});

		return {
			note
		};
	}
}
