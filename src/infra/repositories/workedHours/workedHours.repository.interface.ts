import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";

export interface WorkedHoursRepositoryInterface{
    createWorkedHours(  employee_id: string, hours_worked: string, type_id:string): Promise<WorkedHours>;
    getAllWorkedHoursByEmployeeId(employee_id:string):Promise<WorkedHours[]>
    getAllWorkedHoursByCreated(employee_id:string):Promise<WorkedHours[]>
}