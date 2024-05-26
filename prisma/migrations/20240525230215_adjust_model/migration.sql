/*
  Warnings:

  - The primary key for the `WorkedHours` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `WorkedHours` table. All the data in the column will be lost.
  - You are about to drop the `EmployeeWorkedHours` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `employee_id` to the `WorkedHours` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_id` to the `WorkedHours` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_employee_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_type_id_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeWorkedHours" DROP CONSTRAINT "EmployeeWorkedHours_worked_hours_id_fkey";

-- AlterTable
ALTER TABLE "WorkedHours" DROP CONSTRAINT "WorkedHours_pkey",
DROP COLUMN "id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "employee_id" TEXT NOT NULL,
ADD COLUMN     "type_id" TEXT NOT NULL,
ADD CONSTRAINT "WorkedHours_pkey" PRIMARY KEY ("employee_id");

-- DropTable
DROP TABLE "EmployeeWorkedHours";

-- CreateIndex
CREATE INDEX "WorkedHours_employee_id_idx" ON "WorkedHours"("employee_id");

-- AddForeignKey
ALTER TABLE "WorkedHours" ADD CONSTRAINT "WorkedHours_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkedHours" ADD CONSTRAINT "WorkedHours_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
