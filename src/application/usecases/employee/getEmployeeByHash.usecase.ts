import { Employee } from "../../../domain/entities/employee/employee";
import { AppError } from "../../../error/app.error";
import EmployeeRepositoryInterface from "../../../infra/repositories/employee/employee.repository.interface";

export class GetEmployeeByHashUsecase{
    constructor(private employeeRepository: EmployeeRepositoryInterface) {}
        async execute(hash: string):Promise<Employee |null>{
            if (!hash.trim()) {
                throw new  AppError('required hash.', 500);
            }
            return this.employeeRepository.getEmployeeByHash(hash)
        }
    
}