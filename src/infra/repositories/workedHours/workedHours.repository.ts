import { PrismaClient } from "@prisma/client";
import { AppError } from "../../../error/app.error";
import { WorkedHoursRepositoryInterface } from "./workedHours.repository.interface";
import { WorkedHours } from "../../../domain/entities/workedHours/workedHours";

const prisma = new PrismaClient();

class WorkedHoursRepository implements WorkedHoursRepositoryInterface {


    async createWorkedHours(employee_id: string, hours_worked: string, type_id: string): Promise<WorkedHours> {
        try {
            const workedHoursData = await prisma.workedHours.create({
                data: {
                    employee_id, hours_worked, type_id
                }
            })
            const workedHours = new WorkedHours({
                id: workedHoursData.id,
                date: workedHoursData.date,
                created_at:workedHoursData.created_at,
                employee_id: workedHoursData.employee_id,
                hours_worked: workedHoursData.hours_worked,
                type_id: workedHoursData.type_id
            })
            return workedHours;
        } catch (error) {
            throw new AppError('Failed to create employee workedhours', 500);


        } finally {
            await prisma.$disconnect();
        }
    }

    async getAllWorkedHoursByEmployeeId(employee_id: string): Promise<WorkedHours[]> {

        try {
            const workedHoursData = await prisma.workedHours.findMany(
                {
                    where: {
                        employee_id: employee_id,
                    },
                    include:{
                        employee:true,
                        type:{
                            select:{
                                name:true
                            }
                        }
                    }
                }
            )
            const workedHours: WorkedHours[] = [];
            workedHoursData.map(worked => {
                const hours = new WorkedHours(worked);
                
                workedHours.push(hours)
            });

            return workedHours
        } catch (error) {
            throw new AppError('Failed to get all employee workedhours', 500);
        } finally {
            await prisma.$disconnect();
        }

    }
    async getAllWorkedHoursByCreated(today: string, employee_id: string): Promise<WorkedHours[]> {

        try {
       
            const workedHoursData = await prisma.workedHours.findMany(
                {                   
                    where: {
                        employee_id: employee_id,
                    },
                    include:{
                        employee:true
                    }

                }
            )
            const workedHours: WorkedHours[] = [];
            workedHoursData.map(worked => {
                if (worked.date === today) {
                    const hours = new WorkedHours(worked);
                    workedHours.push(hours)
                }

            });

            return workedHours
        } catch (error) {
            throw new AppError('Failed to get all employee worked hours', 500);
        } finally {
            await prisma.$disconnect();
        }
    }
}




export default WorkedHoursRepository