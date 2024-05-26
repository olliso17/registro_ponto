/*
  Warnings:

  - Added the required column `date` to the `WorkedHours` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkedHours" ADD COLUMN     "date" TEXT NOT NULL;
