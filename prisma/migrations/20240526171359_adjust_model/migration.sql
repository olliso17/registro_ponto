/*
  Warnings:

  - Made the column `hash` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "hash" SET NOT NULL,
ALTER COLUMN "hash" SET DEFAULT 'semHash';
