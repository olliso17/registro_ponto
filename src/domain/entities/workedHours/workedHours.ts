import WorkedHoursInterface from "./workedHours.interface";
import { v4 as uuid } from 'uuid';
import { ZodError, z } from 'zod';
import { AppError } from "../../../error/app.error";
import { isHours } from "../../../util/regex";


type WorkedHoursProps = {
    hours_worked: string,
   
}

export class WorkedHours implements WorkedHoursInterface {
    private _id: string;
    private _hours_worked: string;

    constructor(props:WorkedHoursProps) {
        this._id = uuid.toString();
        this._hours_worked = props.hours_worked;
        this.validateInstance();
    }
   

    get id(): string {
        return this._id;
    }

    get hours_worked(): string {
        return this._hours_worked;
    }

    validateInstance(): void {
        if(isHours.test(this._hours_worked)===false){
             throw new AppError('hours_worked incorrect', 500);

        }
    }
  
}