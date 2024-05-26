import { Type } from "@prisma/client";
import { AppError } from "../../../error/app.error";
import { isHours, stringNotNullAndBlankSpace } from "../../../util/regex";
import WorkedHoursInterface from "./workedHours.interface";
import { Employee } from "../employee/employee";
import { v4 as uuidv4 } from 'uuid';

type WorkedHoursProps = {
    employee_id: string,
    type_id: string,
    hours_worked?: string 
    date?:string
    type?:Type|any
    employee?: Employee|any
}

export class WorkedHours implements WorkedHoursInterface {
    private _id:string;
    private _hours_worked: string;
    private _employee_id: string;
    private _created_at: Date;
    private _date: string;
    private _type_id: string;
    private _type: Type;
    private _employee: Employee;

    constructor(props: WorkedHoursProps) {
        this._id = uuidv4();
        this._employee_id = props.employee_id;
        this._created_at = new Date();
        this._type_id = props.type_id;
        this._date = new Date().toDateString();
        this._hours_worked= props.hours_worked || "00:00:00";
        this._type= props.type || null
        this._employee = props.employee || null
        this.validateWorkedHours();
    }
    get id(): string {
        return this._id;
    }
    get type(): { id: string; name: string; } {
        return this._type
    }
    get employee(): Employee {
        return this._employee
    }
    get date(): string {
        return this._date;
    }
    get hours_worked(): string {
        return this._hours_worked;
    }
    get type_id(): string {
        return this._type_id;
    }
  
    get employee_id(): string {
        return this._employee_id;
    }
    get created_at(): Date {
        return this._created_at;
    }
   
    validateWorkedHours(): void {
        if (stringNotNullAndBlankSpace.test(this._employee_id) === false) {
            throw new AppError("Employee id is not a valid", 500);
        }
        if(isHours.test(this._hours_worked)===false){
            throw new AppError('hours_worked incorrect', 500);

       }
      
    }

}