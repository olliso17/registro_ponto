import { Employee } from "../../../domain/entities/employee/employee";

interface EmployeeRepositoryInterface {
    createEmployee(name: string): Promise<Employee>;
    getEmployeeById(id: string): Promise<Employee | null>;
    getAllEmployees(): Promise<Employee[]>;
    updateEmployee(id: string, Employee:any): Promise<Employee | null>;
    deleteEmployee(id: string): Promise<void>;
}

export default EmployeeRepositoryInterface;