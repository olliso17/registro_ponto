import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";

export class GetAllWorkedHoursByCreatedUsecase {
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface) { }
    async execute(employee_id: string): Promise<WorkedHours[]> {

        return this.workedHourssRepository.getAllWorkedHoursByCreated(employee_id);
    }
}