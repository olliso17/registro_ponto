import EmployeeInterface from "./employee.interface";
import { v4 as uuid } from 'uuid';
import { AppError } from "../../../error/app.error";
import { stringNotNullAndBlankSpace } from "../../../util/regex";


type EmployeeProps = {
    name: string,  
}

export class Employee implements EmployeeInterface{
    private _id: string;
    private _name: string;
    private _created_at: Date;
    private _updated_at: Date;
    private _active: boolean;

    constructor(props: EmployeeProps) {
        this._id = uuid.toString();
        this._name = props.name;
        this._created_at = new Date;
        this._updated_at = new Date;
        this._active = true;
        this.validateEmployee()
    }
   
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    get created_at(): Date {
        return this._created_at
    }
    get updated_at(): Date {
        return this._updated_at;
    }
    get active(): boolean {
        return this._active;
    }
    validateEmployee(){
        if (stringNotNullAndBlankSpace.test(this._name) === false) {
			throw new AppError("Name is not a valid employee",  500);
		}
    }
}