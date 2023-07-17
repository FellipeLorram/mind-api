import { Appointment, Prisma } from '@prisma/client';
import { AppointmentRepository } from '../appointment-repository';

export class InMemoryAppointmentsRepository implements AppointmentRepository {
	private Appointments: Appointment[];

	constructor() {
		this.Appointments = [];
	}

	async create(data: Prisma.AppointmentUncheckedCreateInput) {
		const appointment: Appointment = {
			...data,
			createdAt: new Date(),
			updatedAt: new Date(),
			id: String(this.Appointments.length + 1),
		};

		this.Appointments.push(appointment);

		return appointment;
	}

	// async update(id: string, Appointment: Prisma.AppointmentUncheckedUpdateInput) {
	// 	const AppointmentIndex = this.Appointments.findIndex((Appointment) => Appointment.id === id);

	// 	if (AppointmentIndex < 0) {
	// 		throw new Error('Appointment not found');
	// 	}

	// 	this.Appointments[AppointmentIndex] = {
	// 		...this.Appointments[AppointmentIndex],
	// 		address: Appointment.address ? Appointment.address as string : this.Appointments[AppointmentIndex].address,
	// 		age: Appointment.age ? Appointment.age as number : this.Appointments[AppointmentIndex].age,
	// 		appointment_duration: Appointment.appointment_duration ? Appointment.appointment_duration as number : this.Appointments[AppointmentIndex].appointment_duration,
	// 		appointment_time: Appointment.appointment_time ? new Date(Appointment.appointment_time as string) : this.Appointments[AppointmentIndex].appointment_time,
	// 		email: Appointment.email ? Appointment.email as string : this.Appointments[AppointmentIndex].email,
	// 		name: Appointment.name ? Appointment.name as string : this.Appointments[AppointmentIndex].name,
	// 		birthDate: Appointment.birthDate ? new Date(Appointment.birthDate as string) : this.Appointments[AppointmentIndex].birthDate,
	// 		gender: Appointment.gender ? Appointment.gender as string : this.Appointments[AppointmentIndex].gender,
	// 		modality: Appointment.modality ? Appointment.modality as string : this.Appointments[AppointmentIndex].modality,
	// 		nationality: Appointment.nationality ? Appointment.nationality as string : this.Appointments[AppointmentIndex].nationality,
	// 		observation: Appointment.observation ? Appointment.observation as string : this.Appointments[AppointmentIndex].observation,
	// 	};

	// 	return this.Appointments[AppointmentIndex];
	// }

	// async delete(id: string) {
	// 	const AppointmentIndex = this.Appointments.findIndex((Appointment) => Appointment.id === id);

	// 	if (AppointmentIndex < 0) {
	// 		throw new Error('Appointment not found');
	// 	}

	// 	this.Appointments.splice(AppointmentIndex, 1);
	// }

	// async findById(id: string) {
	// 	const Appointment = this.Appointments.find((Appointment) => Appointment.id === id);
	// 	return Appointment || null;
	// }
} 