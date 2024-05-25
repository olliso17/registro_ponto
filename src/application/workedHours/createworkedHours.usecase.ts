import { AppError } from "../../error/app.error";
import WorkedHoursRepositoryInterface from "../../infra/repositories/workedHours/workedHours.repository.inteface";
import { WorkedHours } from "../../domain/entities/workedHours/workedHours";

export class CreateWorkedHoursUsecase{
    constructor(private workedHoursRepository: WorkedHoursRepositoryInterface) {}
        async execute(hours_worked: string):Promise<WorkedHours |null>{
            if (!hours_worked.trim()) {
                throw new  AppError('Todos os campos devem ser preenchidos.', 500);
            }
            return this.workedHoursRepository.createWorkedHours(hours_worked)
        }
    
}