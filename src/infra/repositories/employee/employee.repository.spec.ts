import { describe, expect, test } from 'vitest';
import { AppError } from '../../../error/app.error';
import EmployeeRepository from './employee.repository';
import prisma from '../../../../prisma/prisma';

describe('Employee Repository', () => {

    const employeeReppository = new EmployeeRepository()
  
    test('not create employee', async () => {
        const name = 'Raquel'

        await expect(employeeReppository.createEmployee(name)).rejects.toThrow(new AppError('Name is not a valid employee'))
    });
});