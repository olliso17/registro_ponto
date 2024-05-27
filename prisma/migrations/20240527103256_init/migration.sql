-- DropIndex
DROP INDEX "WorkedHours_employee_id_idx";

-- DropIndex
DROP INDEX "WorkedHours_id_idx";

-- DropIndex
DROP INDEX "WorkedHours_type_id_idx";

-- CreateIndex
CREATE INDEX "Employee_created_at_id_name_hash_idx" ON "Employee"("created_at", "id", "name", "hash");

-- CreateIndex
CREATE INDEX "Type_id_name_idx" ON "Type"("id", "name");

-- CreateIndex
CREATE INDEX "WorkedHours_employee_id_id_type_id_idx" ON "WorkedHours"("employee_id", "id", "type_id");
