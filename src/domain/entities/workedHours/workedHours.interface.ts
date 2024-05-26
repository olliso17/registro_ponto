import { Type } from "@prisma/client";
import { Employee } from "../employee/employee";

export default interface WorkedHoursInterface{
    get employee_id(): string;
    get created_at():Date;
    get date():string;
    get type_id():string;
    get hours_worked(): string;
    get type(): Type
    get employee():Employee
    validateWorkedHours():void;
}