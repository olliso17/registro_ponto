import { Request, Response } from "express";
import { CreateWorkedHoursUsecase } from "../../application/workedHours/createworkedHours.usecase";
import WorkedHoursRepository from "../repositories/workedHours/workedHours.repository";

class WorkedHoursController {
    private createWorkedHoursUsecase: CreateWorkedHoursUsecase;

    constructor() {
        const workedHoursRepository = new WorkedHoursRepository();
        this.createWorkedHoursUsecase = new CreateWorkedHoursUsecase(workedHoursRepository);
    }

    async createWorkedHours(req: Request, res: Response): Promise<Response> {
        const { hours_worked } = req.body;

        try {
            const workedHours = await this.createWorkedHoursUsecase.execute(hours_worked);
            return res.status(201).json(workedHours);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create WorkedHours' });
        }
    }
}

export default WorkedHoursController;