
import {PrismaClient } from '@prisma/client';
import EmployeeRepositoryInterface from './employee.repository.interface';
import { AppError } from '../../../error/app.error';
import { Employee } from '../../../domain/entities/employee/employee';
import { WorkedHours } from '@prisma/client';


const prisma = new PrismaClient();

class EmployeeRepository implements EmployeeRepositoryInterface {
    async createEmployee(name: string): Promise<Employee> {
        try {
            const employeeData = await prisma.employee.create({
                data: {
                    name
                }
            });

            const employee = new Employee({
                name: employeeData.name,
    
            });

            return employee;
        } catch (error) {
            throw new AppError('Failed to create employee', 500);
        } finally {
            await prisma.$disconnect();
        }
    }

    async getEmployeeById(id: string): Promise<Employee | null> {
        const employeeData = await prisma.employee.findUnique({
            where: {
                id,
            },
            include: {
                workedHours: {
                    include:{
                        type:true
                    }
                }
            },
            
        });

        if (!employeeData) return null;

        const employee = new Employee({
            name: employeeData.name
        });

        return employee;
    }

    async getAllEmployees(): Promise<Employee[]> {
        const employeesData = await prisma.employee.findMany();

        return employeesData.map(employeeData => {
            const employee = new Employee({
                name: employeeData.name
               
            });
            return employee;
        });
    }

    async updateEmployee(id: string, data: any): Promise<Employee | null> {
        try {
            await prisma.employee.update({
                where: {
                    id,
                },
                data,
            });

            const updatedEmployeeData = await prisma.employee.findUnique({
                where: {
                    id,
                },
            });

            if (!updatedEmployeeData) return null;

            const updatedEmployee = new Employee({
                name: updatedEmployeeData.name,
                updated_at: updatedEmployeeData.updated_at,
                active: updatedEmployeeData.active
            });

            return updatedEmployee;
        } catch (error) {
            throw new AppError('Failed to update employee', 500);
        }
    }

    async deleteEmployee(id: string): Promise<void> {
        try {
            await prisma.employee.delete({
                where: {
                    id,
                },
            });
        } catch (error) {
            throw new AppError('Failed to delete employee', 500);
        }
    }
}

export default EmployeeRepository;