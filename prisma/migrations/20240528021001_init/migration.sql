-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "hash" TEXT NOT NULL DEFAULT 'semHash',

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkedHours" (
    "id" TEXT NOT NULL,
    "employee_id" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" TEXT NOT NULL DEFAULT '',
    "hours_worked" TEXT NOT NULL DEFAULT '00h 00m',

    CONSTRAINT "WorkedHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_name_key" ON "Employee"("name");

-- CreateIndex
CREATE INDEX "Employee_created_at_id_name_hash_idx" ON "Employee"("created_at", "id", "name", "hash");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE INDEX "Type_id_name_idx" ON "Type"("id", "name");

-- CreateIndex
CREATE INDEX "WorkedHours_employee_id_id_type_id_idx" ON "WorkedHours"("employee_id", "id", "type_id");

-- AddForeignKey
ALTER TABLE "WorkedHours" ADD CONSTRAINT "WorkedHours_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkedHours" ADD CONSTRAINT "WorkedHours_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
