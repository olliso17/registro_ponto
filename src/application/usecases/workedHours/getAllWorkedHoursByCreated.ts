import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";
import { WorkedHoursRepositoryInterface } from "../../../infra/repositories/workedHours/workedHours.repository.interface";

<<<<<<< HEAD
export class GetAllWorkedHoursByCreatedUsecase{
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface){}
    async execute(employee_id:string):Promise<WorkedHours[]>{
    
        if ( !employee_id.trim()) {
            throw new  AppError('Todos os campos devem ser preenchidos.', 500);
        }
=======
export class GetAllWorkedHoursByCreatedUsecase {
    constructor(private workedHourssRepository: WorkedHoursRepositoryInterface) { }
    async execute(employee_id: string): Promise<WorkedHours[]> {

>>>>>>> 8ad4843044b08a5a56e9df08519d523478bf19e2
        return this.workedHourssRepository.getAllWorkedHoursByCreated(employee_id);
    }
}