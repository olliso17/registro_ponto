/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `EmployeeWorkedHours` table. All the data in the column will be lost.
  - You are about to drop the column `employeeId` on the `EmployeeWorkedHours` table. All the data in the column will be lost.
  - You are about to drop the column `workedHoursId` on the `EmployeeWorkedHours` table. All the data in the column will be lost.
  - You are about to drop the column `hoursWorked` on the `WorkedHours` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employee_id` to the `EmployeeWorkedHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worked_hours_id` to the `EmployeeWorkedHours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_workedHoursId_fkey";

-- DropIndex
DROP INDEX "EmployeeWorkedHours_employeeId_idx";

-- DropIndex
DROP INDEX "EmployeeWorkedHours_workedHoursId_idx";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeWorkedHours" DROP COLUMN "createdAt",
DROP COLUMN "employeeId",
DROP COLUMN "workedHoursId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employee_id" TEXT NOT NULL,
ADD COLUMN     "worked_hours_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WorkedHours" DROP COLUMN "hoursWorked",
ADD COLUMN     "hours_worked" TEXT NOT NULL DEFAULT '00:00:00';

-- CreateIndex
CREATE INDEX "EmployeeWorkedHours_employee_id_idx" ON "EmployeeWorkedHours"("employee_id");

-- CreateIndex
CREATE INDEX "EmployeeWorkedHours_worked_hours_id_idx" ON "EmployeeWorkedHours"("worked_hours_id");

-- AddForeignKey
ALTER TABLE "EmployeeWorkedHours" ADD CONSTRAINT "EmployeeWorkedHours_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeWorkedHours" ADD CONSTRAINT "EmployeeWorkedHours_worked_hours_id_fkey" FOREIGN KEY ("worked_hours_id") REFERENCES "WorkedHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
