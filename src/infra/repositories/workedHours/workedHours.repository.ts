
import { AppError } from '../../../error/app.error';
import WorkedHoursRepositoryInterface from './workedHours.repository.inteface';
import { WorkedHours } from '../../../domain/entities/workedHours/workedHours';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class WorkedHoursRepository implements WorkedHoursRepositoryInterface {
    async createWorkedHours(hours_worked: string): Promise<WorkedHours> {
        try {
            const workedHoursData = await prisma.workedHours.create({
                data: {
                    hours_worked
                }
            });

            const workedHours = new WorkedHours({
                hours_worked: workedHoursData.hours_worked,

            });

            return workedHours;
        } catch (error) {
            throw new AppError('Failed to create worked hours', 500);
        }
    }
}


export default WorkedHoursRepository;