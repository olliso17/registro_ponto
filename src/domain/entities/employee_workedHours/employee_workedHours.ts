import { AppError } from "../../../error/app.error";
import { stringNotNullAndBlankSpace } from "../../../util/regex";
import EmployeeWorkedHoursInterface from "./employee_workedHours.interface";

type EmployeeWorkedHoursProps = {
    employee_id: string,
    worked_hours_id: string
}

export class EmployeeWorkedHours implements EmployeeWorkedHoursInterface {

    private _worked_hours_id: string;
    private _employee_id: string;
    private _created_at: Date;

    constructor(props: EmployeeWorkedHoursProps) {
        this._worked_hours_id= props.worked_hours_id;
        this._employee_id= props.employee_id;
        this._created_at= new Date();
        this.validateEmployeeWorkedHours()
    }
    get worked_hours_id(): string {
        return this._worked_hours_id;
    }
    get employee_id(): string {
        return this._employee_id;
    }
    get created_at(): Date {
        return this._created_at;
    }
    validateEmployeeWorkedHours():void{
        if (stringNotNullAndBlankSpace.test(this._employee_id) === false) {
			throw new AppError("Employee id is not a valid",  500);
		}
        if (stringNotNullAndBlankSpace.test(this._worked_hours_id )=== false) {
			throw new AppError("Worked hours id is not a valid",  500);
		}
    }

}