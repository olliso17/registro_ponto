import { S } from "vitest/dist/reporters-yx5ZTtEV";
import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";
import { AppError } from "../../../error/app.error";

export class GetAllWorkedHoursByCreatedUsecase{
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface){}
    async execute(employee_id:string):Promise<WorkedHours[]>{
        const today = new Date().toDateString();
        if (!today.trim() || !employee_id) {
            throw new  AppError('Todos os campos devem ser preenchidos.', 500);
        }
        return this.workedHourssRepository.getAllWorkedHoursByCreated(today,employee_id);
    }
}