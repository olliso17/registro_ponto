import TypeInterface from "./type.interface";
import { v4 as uuidv4 } from 'uuid';
type Props={
    id?:string,
    name?:string | ""
}

export class TypeEntity implements TypeInterface{
    private _id:string;
    private _name:string;

    constructor(props:Props){
        this._id = props.id || uuidv4();
        this._name = props.name || "";
    }
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    
}