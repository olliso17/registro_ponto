import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { AppError } from "../../../error/app.error";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";


export class CreateWorkedHoursUsecase{
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface) {}
        async execute(employee_id: string,hours_worked:string, type_id:string):Promise<WorkedHours |null>{
            if (!employee_id.trim() || !type_id.trim()) {
                throw new  AppError('Todos os campos devem ser preenchidos.', 500);
            }
            return this.workedHourssRepository.createWorkedHours(employee_id, hours_worked, type_id)
        }
    
}