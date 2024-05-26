import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { AppError } from "../../../error/app.error";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";


export class GetAllWorkedByEmployeeIdUsecase{
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface) {}
        async execute(employee_id: string):Promise<WorkedHours[]>{
            if (!employee_id.trim()) {
                throw new  AppError('Todos os campos devem ser preenchidos.', 500);
            }
            return this.workedHourssRepository.getAllWorkedHoursByEmployeeId(employee_id)
        }
    
}