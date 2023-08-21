// model Patient {
// 	id          String    @id @default(uuid())
// 	name        String
// 	address     String?
// 	age         Int
// 	email       String?   @unique
// 	gender      String?
// 	observation String?
// 	nationality String?
// 	birthDate   DateTime?
// 	phones      Phone[]
  
// 	modality             String
// 	appointment_duration Int
// 	appointment_time     DateTime
  
// 	customFields CustomField[]
// 	appointments Appointment[]
// 	user         User          @relation(fields: [user_id], references: [id])
// 	user_id      String
  
// 	createdAt    DateTime       @default(now())
// 	updatedAt    DateTime       @updatedAt
// 	detachedNote DetachedNote[]
  
// 	@@map("patients")
//   }

export interface User {
	id: string;
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Patient {
	id: string;
	name: string;
	address?: string;
	age: number;
	email?: string;
	gender?: string;
	observation?: string;
	nationality?: string;
	birthDate?: Date;
	modality: string;
	appointment_duration: number;
	appointment_time: Date;
	createdAt: Date;
	updatedAt: Date;
	user_id: string;
}