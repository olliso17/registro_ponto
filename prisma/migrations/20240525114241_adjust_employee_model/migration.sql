/*
  Warnings:

  - The primary key for the `EmployeeWorkedHours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EmployeeWorkedHours` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "EmployeeWorkedHours_pkey" PRIMARY KEY ("employee_id", "worked_hours_id");
