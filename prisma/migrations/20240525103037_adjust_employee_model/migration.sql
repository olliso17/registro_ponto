-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkedHours" (
    "id" TEXT NOT NULL,
    "hoursWorked" TEXT NOT NULL DEFAULT '00:00:00',

    CONSTRAINT "WorkedHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeWorkedHours" (
    "id" TEXT NOT NULL,
    "employeeId" TEXT NOT NULL,
    "workedHoursId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmployeeWorkedHours_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EmployeeWorkedHours_employeeId_idx" ON "EmployeeWorkedHours"("employeeId");

-- CreateIndex
CREATE INDEX "EmployeeWorkedHours_workedHoursId_idx" ON "EmployeeWorkedHours"("workedHoursId");

-- AddForeignKey
ALTER TABLE "EmployeeWorkedHours" ADD CONSTRAINT "EmployeeWorkedHours_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeWorkedHours" ADD CONSTRAINT "EmployeeWorkedHours_workedHoursId_fkey" FOREIGN KEY ("workedHoursId") REFERENCES "WorkedHours"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
