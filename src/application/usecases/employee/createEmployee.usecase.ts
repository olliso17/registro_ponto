import { Employee } from "../../../domain/entities/employee/employee";
import { AppError } from "../../../error/app.error";
import EmployeeRepositoryInterface from "../../../infra/repositories/employee/employee.repository.interface";


export class CreateEmployeeUsecase{
    constructor(private employeeRepository: EmployeeRepositoryInterface) {}
        async execute(name: string):Promise<Employee |null>{
            if (!name.trim()) {
                throw new  AppError('Todos os campos devem ser preenchidos.', 500);
            }
            return this.employeeRepository.createEmployee(name)
        }
    
}