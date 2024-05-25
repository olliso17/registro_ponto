export default interface EmployeeWorkedHoursInterface{
    get worked_hours_id(): string;
    get employee_id(): string;
    get created_at():Date;
    validateEmployeeWorkedHours():void
}