import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";

export class GetWorkedHoursByEntryTypeUsecase {
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface) { }
    async execute(employee_id: string): Promise<WorkedHours[]> {

        return this.workedHourssRepository.getWorkedHoursByEntryType(employee_id);
    }
}