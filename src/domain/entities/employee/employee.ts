import EmployeeInterface from "./employee.interface";
import { v4 as uuidv4 } from 'uuid';
import { AppError } from "../../../error/app.error";
import { stringNotNullAndBlankSpace } from "../../../util/regex";
import * as CRC32 from 'crc-32';


type EmployeeProps = {
    name: string,  
    active?:boolean
    updated_at?:Date
    hash?:string,
    id?: string,
    created_at?:Date
}

export class Employee implements EmployeeInterface{
    private _id: string;
    private _name: string;
    private _created_at: Date;
    private _updated_at: Date;
    private _active: boolean;
    private _hash:string;

    constructor(props: EmployeeProps) {
        this._id = props.id || uuidv4();
        this._name = props.name;
        this._created_at = props.created_at || new Date;
        this._updated_at = props.updated_at|| new Date;
        this._active = props.active|| true;
        this._hash = this.generateHash(this._name)
        this.validateEmployee()
    }
    get hash(): string {
        return this._hash;
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
    generateHash(name:string) {
        const hash = CRC32.str(name);
        this._hash = (hash >>> 0).toString(16).padStart(8, '0');
        
        return this._hash
    }
    validateEmployee(){
        if (stringNotNullAndBlankSpace.test(this._name) === false) {
			throw new AppError("Name is not a valid employee",  500);
		}
    }
}