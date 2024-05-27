import { beforeAll, describe, expect, test } from "vitest";
import EmployeeRepository from "../../../infra/repositories/employee/employee.repository";
import { CreateEmployeeUsecase } from "./createEmployee.usecase";

let createEmployeeUsecase: CreateEmployeeUsecase

beforeAll(() => {
    const repository = new EmployeeRepository();
    createEmployeeUsecase = new CreateEmployeeUsecase(repository);
})

describe("CreateEmployeeUsecase", () => {
    test('should create an employee with all necessary properties', async () => {

        const name = "Patricia";
        const result = await createEmployeeUsecase.execute(name);

        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('hash');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('created_at');
        expect(result).toHaveProperty('updated_at');
        expect(result).toHaveProperty('active');
    });

    // test('name already exists', async () => {

    //     const name = "Maria";
    //     await createEmployeeUsecase.execute(name);
    //     await expect(async () => {
    //         await createEmployeeUsecase.execute(name);
    //     }).rejects.toThrowError( 'Employee with this name already exists');
    // });
});