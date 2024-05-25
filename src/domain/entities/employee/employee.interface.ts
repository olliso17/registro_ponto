
export default interface EmployeeInterface{
    get id(): string;
    get name(): string;
    get created_at(): Date;
    get updated_at(): Date;
    get active(): boolean;
    validateEmployee():void;
}