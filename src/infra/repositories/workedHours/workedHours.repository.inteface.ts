import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";

interface  WorkedHoursRepositoryInterface {
    createWorkedHours(hours_worked: string): Promise<WorkedHours>;
    // getEmployeeById(id: string): Promise<Employee | null>;
    // getAllEmployees(): Promise<Employee[]>;
    // updateEmployee(id: string, Employee:any): Promise<Employee | null>;
    // deleteEmployee(id: string): Promise<void>;
}

export default  WorkedHoursRepositoryInterface;