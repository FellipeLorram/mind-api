/*
  Warnings:

  - You are about to drop the column `patient_id` on the `notes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "notes" DROP CONSTRAINT "notes_patient_id_fkey";

-- AlterTable
ALTER TABLE "notes" DROP COLUMN "patient_id";

-- CreateTable
CREATE TABLE "detached_notes" (
    "content" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "detached_notes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "detached_notes" ADD CONSTRAINT "detached_notes_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
