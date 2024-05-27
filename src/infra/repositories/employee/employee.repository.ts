
import { PrismaClient } from '@prisma/client';
import * as CRC32 from 'crc-32';
import { Employee } from '../../../domain/entities/employee/employee';
import { AppError } from '../../../error/app.error';
import EmployeeRepositoryInterface from './employee.repository.interface';

const prisma = new PrismaClient();


class EmployeeRepository implements EmployeeRepositoryInterface {
    async createEmployee(name: string): Promise<Employee> {
     
        const codigo = CRC32.str(name);
        const hash = (codigo >>> 0).toString(16).padStart(8, '0');
        try {
            const employeeData = await prisma.employee.create({
                data: {
                    name, hash
                }
            });

            const employee = new Employee({
                name: employeeData.name,
                hash: employeeData.hash,
                id: employeeData.id,
                created_at: employeeData.created_at,
                active: employeeData.active,
                updated_at: employeeData.updated_at
            });


            return employee;
        } catch (error) {
            throw new AppError("Name is not a valid employee", 500);
        } finally {
            await prisma.$disconnect();
        }
    }

    async getEmployeeById(id: string): Promise<Employee | null> {

        try {
            const employeeData = await prisma.employee.findUnique({
                where: {
                    id,
                },
                include: {
                    workedHours: {
                        include: {
                            type: true
                        }
                    }
                },

            });

            if (!employeeData) return null;

            const employee = new Employee({
                name: employeeData.name,
                hash: employeeData.hash,
                id: employeeData.id,
                created_at: employeeData.created_at,
                active: employeeData.active,
                updated_at: employeeData.updated_at,
            });

            return employee;
        } catch (error) {

            throw new AppError('Failed to get employee by id', 500);
        } finally {
            await prisma.$disconnect();
        }

    }
    async getEmployeeByHash(hash: string): Promise<Employee | null> {
        try {
            const employeeData = await prisma.employee.findFirst({
                where: {
                    hash: hash,
                },
                include: {
                    workedHours: {
                        include: {
                            type: true
                        }
                    }
                },

            });

            if (!employeeData) return null;

            const employee = new Employee(employeeData);

            return employee;
        } catch (error) {
            throw new AppError('Failed to  get hash employee', 500);
        } finally {
            await prisma.$disconnect();
        }

    }
    // async getAllEmployees(): Promise<Employee[]> {
    //     const employeesData = await prisma.employee.findMany();

    //     return employeesData.map(employeeData => {
    //         const employee = new Employee({
    //             name: employeeData.name

    //         });
    //         return employee;
    //     });
    // }

    // async updateEmployee(id: string, data: any): Promise<Employee | null> {
    //     try {
    //         await prisma.employee.update({
    //             where: {
    //                 id,
    //             },
    //             data,
    //         });

    //         const updatedEmployeeData = await prisma.employee.findUnique({
    //             where: {
    //                 id,
    //             },
    //         });

    //         if (!updatedEmployeeData) return null;

    //         const updatedEmployee = new Employee({
    //             name: updatedEmployeeData.name,
    //             updated_at: updatedEmployeeData.updated_at,
    //             active: updatedEmployeeData.active
    //         });

    //         return updatedEmployee;
    //     } catch (error) {
    //         throw new AppError('Failed to update employee', 500);
    //     }
    // }

    // async deleteEmployee(id: string): Promise<void> {
    //     try {
    //         await prisma.employee.delete({
    //             where: {
    //                 id,
    //             },
    //         });
    //     } catch (error) {
    //         throw new AppError('Failed to delete employee', 500);
    //     }
    // }
}

export default EmployeeRepository;