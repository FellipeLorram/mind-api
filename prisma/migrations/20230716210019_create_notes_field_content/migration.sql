/*
  Warnings:

  - Added the required column `content` to the `notes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "notes" ADD COLUMN     "content" TEXT NOT NULL;
