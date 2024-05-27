import { Employee } from "../../../domain/entities/employee/employee";
import EmployeeRepositoryInterface from "../../../infra/repositories/employee/employee.repository.interface";

export class GetEmployeeByIdUsecase{
    constructor(private employeeRepository: EmployeeRepositoryInterface){}
    async execute(id:string):Promise<Employee|null>{
        return this.employeeRepository.getEmployeeById(id)
    }
}