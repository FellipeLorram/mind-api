/*
  Warnings:

  - Added the required column `appointment_time` to the `appointments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appointments" ADD COLUMN     "appointment_time" TIMESTAMP(3) NOT NULL;
