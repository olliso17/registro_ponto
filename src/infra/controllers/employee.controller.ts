import { Request, Response } from 'express';
import EmployeeRepository from '../repositories/employee/employee.repository';
import { CreateEmployeeUsecase } from '../../application/usecases/employee/createEmployee.usecase';
import { GetEmployeeByHashUsecase } from '../../application/usecases/employee/getEmployeeByHash.usecase';
import { GetEmployeeByIdUsecase } from '../../application/usecases/employee/getEmployeeById.usecase';

class EmployeeController {
    private createEmployeeUsecase: CreateEmployeeUsecase;
    private getEmployeeByHashUsecase:GetEmployeeByHashUsecase
    private getEmployeeByIdUsecase: GetEmployeeByIdUsecase
    constructor() {
        const employeeRepository = new EmployeeRepository();
        this.createEmployeeUsecase = new CreateEmployeeUsecase(employeeRepository);
        this.getEmployeeByHashUsecase = new GetEmployeeByHashUsecase(employeeRepository)
        this.getEmployeeByIdUsecase = new GetEmployeeByIdUsecase(employeeRepository)
    }

    async createEmployee(req: Request, res: Response): Promise<Response> {
        const { name } = req.body;

        try {
            const employee = await this.createEmployeeUsecase.execute(name);
            return res.status(201).json(employee);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to create employee' });
        }
    }

    async getEmployeeByHash(req: Request, res: Response): Promise<Response> {
        const {hash} = req.body;

        try {
            const employee = await this.getEmployeeByHashUsecase.execute(hash)
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            return res.status(200).json(employee);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch employee' });
        }
    }
    async getEmployeeById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;

        try {
            const employee = await this.getEmployeeByIdUsecase.execute(id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            return res.status(200).json(employee);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch employee' });
        }
    }

    // async getAllEmployees(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const employees = await this.employeeRepository.getAllEmployees();
    //         return res.status(200).json(employees);
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Failed to fetch employees' });
    //     }
    // }

    // async updateEmployee(req: Request, res: Response): Promise<Response> {
    //     const { id } = req.params;
    //     const updateData = req.body;

    //     try {
    //         const updatedEmployee = await this.employeeRepository.updateEmployee(id, updateData);
    //         if (!updatedEmployee) {
    //             return res.status(404).json({ error: 'Employee not found' });
    //         }
    //         return res.status(200).json(updatedEmployee);
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Failed to update employee' });
    //     }
    // }

    // async deleteEmployee(req: Request, res: Response): Promise<Response> {
    //     const { id } = req.params;

    //     try {
    //         await this.employeeRepository.deleteEmployee(id);
    //         return res.status(204).send();
    //     } catch (error) {
    //         return res.status(500).json({ error: 'Failed to delete employee' });
    //     }
    // }
}

export default EmployeeController;
