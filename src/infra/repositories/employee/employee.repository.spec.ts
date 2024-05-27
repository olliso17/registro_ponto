import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import EmployeeRepository from './employee.repository';
import { AppError } from '../../../error/app.error';
import { Employee } from '../../../domain/entities/employee/employee';

// Mock Prisma Client
vi.mock('@prisma/client', () => {
    const PrismaClientMock = {
        employee: {
            create: vi.fn(),
            findUnique: vi.fn(),
            findFirst: vi.fn(),
        },
        $disconnect: vi.fn(),
    };
    return { PrismaClient: vi.fn(() => PrismaClientMock) };
});

const prisma = new PrismaClient();
const repository = new EmployeeRepository();

describe('EmployeeRepository', () => {
    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks();
    });

    describe('createEmployee', () => {
        it('should create a new employee', async () => {
            const employeeData = {
                id: '1',
                name: 'John Doe',
                hash: '12345678',
                created_at: new Date(),
                updated_at: new Date(),
                active: true,
            };

            (prisma.employee.create as jest.Mock).mockResolvedValue(employeeData);

            const result = await repository.createEmployee('John Doe');

            expect(result).toBeInstanceOf(Employee);
            expect(result.name).toBe(employeeData.name);
            expect(result.hash).toBe(employeeData.hash);
        });

        it('should throw an AppError if creation fails', async () => {
            (prisma.employee.create as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(repository.createEmployee('John Doe')).rejects.toThrow(AppError);
        });
    });

    describe('getEmployeeById', () => {
        it('should return an employee by ID', async () => {
            const employeeData = {
                id: '1',
                name: 'John Doe',
                hash: '12345678',
                created_at: new Date(),
                updated_at: new Date(),
                active: true,
                workedHours: [],
            };

            (prisma.employee.findUnique as jest.Mock).mockResolvedValue(employeeData);

            const result = await repository.getEmployeeById('1');

            expect(result).toBeInstanceOf(Employee);
            expect(result?.id).toBe(employeeData.id);
        });

        it('should return null if no employee is found', async () => {
            (prisma.employee.findUnique as jest.Mock).mockResolvedValue(null);

            const result = await repository.getEmployeeById('1');

            expect(result).toBeNull();
        });

        it('should throw an AppError if retrieval fails', async () => {
            (prisma.employee.findUnique as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(repository.getEmployeeById('1')).rejects.toThrow(AppError);
        });
    });

    describe('getEmployeeByHash', () => {
        it('should return an employee by hash', async () => {
            const employeeData = {
                id: '1',
                name: 'John Doe',
                hash: '12345678',
                created_at: new Date(),
                updated_at: new Date(),
                active: true,
                workedHours: [],
            };

            (prisma.employee.findFirst as jest.Mock).mockResolvedValue(employeeData);

            const result = await repository.getEmployeeByHash('12345678');

            expect(result).toBeInstanceOf(Employee);
            expect(result?.hash).toBe(employeeData.hash);
        });

        it('should return null if no employee is found', async () => {
            (prisma.employee.findFirst as jest.Mock).mockResolvedValue(null);

            const result = await repository.getEmployeeByHash('12345678');

            expect(result).toBeNull();
        });

        it('should throw an AppError if retrieval fails', async () => {
            (prisma.employee.findFirst as jest.Mock).mockRejectedValue(new Error('Database error'));

            await expect(repository.getEmployeeByHash('12345678')).rejects.toThrow(AppError);
        });
    });
});
