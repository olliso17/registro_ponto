import { Request, Response } from "express";
import { CreateWorkedHoursUsecase } from "../../application/usecases/workedHours/createWorkedHours.usecase";
import { GetAllWorkedByEmployeeIdUsecase } from "../../application/usecases/workedHours/getAllWorkedHoursByEmployeeId.usecase";
import WorkedHoursRepository from "../repositories/workedHours/workedHours.repository";
import { WorkedHours } from '@prisma/client';
import { GetAllWorkedHoursByCreatedUsecase } from '../../application/usecases/workedHours/getAllWorkedHoursByCreated';


class WorkedHoursController {
    private createWorkedHoursUsecase: CreateWorkedHoursUsecase;
    private getAllWorkedByEmployeeIdUsecase: GetAllWorkedByEmployeeIdUsecase;
    private getAllWorkedHoursByCreatedUsecase: GetAllWorkedHoursByCreatedUsecase

    constructor() {
        const workedHoursRepository = new WorkedHoursRepository();
        this.createWorkedHoursUsecase = new CreateWorkedHoursUsecase(workedHoursRepository);
        this.getAllWorkedByEmployeeIdUsecase = new GetAllWorkedByEmployeeIdUsecase(workedHoursRepository)
        this.getAllWorkedHoursByCreatedUsecase = new GetAllWorkedHoursByCreatedUsecase(workedHoursRepository)
    }

    async createWorkedHours(req: Request, res: Response): Promise<Response> {
        const { employee_id, hours_worked, type_id} = req.body;
      
        try {
             const workedHours = await this.createWorkedHoursUsecase.execute(employee_id,hours_worked, type_id);
            return res.status(201).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create WorkedHours' });


        }
    }
     async getWorkedHoursByEmployeeId(req: Request, res: Response): Promise<Response> {
        const {employee_id} = req.params;

        try {
            const workedHours = await this.getAllWorkedByEmployeeIdUsecase.execute(employee_id);
            if (!workedHours) {
                return res.status(404).json({ error: 'Employee Worked Hours not found' });
            }
            return res.status(200).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch Employee Worked Hours' });
        }
    }
    async getWorkedHoursByCreated(req: Request, res: Response): Promise<Response> {
        const {employee_id} = req.params;
        try {
            const workedHours = await this.getAllWorkedHoursByCreatedUsecase.execute(employee_id);
            if (!workedHours) {
                return res.status(404).json({ error: 'Employee Worked Hours not found' });
            }
            return res.status(200).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch Employee Worked Hours' });
        }
    }
}

export default WorkedHoursController;