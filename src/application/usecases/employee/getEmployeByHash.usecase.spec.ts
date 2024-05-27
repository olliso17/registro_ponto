import * as CRC32 from 'crc-32';
import { describe, expect, test } from "vitest";
import EmployeeRepository from "../../../infra/repositories/employee/employee.repository";
import { GetEmployeeByHashUsecase } from "./getEmployeeByHash.usecase";

describe("GetEmployeeByHashUsecase", () => {
    test('get employee by hash', async () => {
        const repository = new EmployeeRepository();

        const getEmployeeHashUsecase = new GetEmployeeByHashUsecase(repository);
        const codigo = CRC32.str('Patricia');
        const hash = (codigo >>> 0).toString(16).padStart(8, '0');
        const result = await getEmployeeHashUsecase.execute(hash);
        if (!result) {
            throw new Error(`Employee with hash '${hash}' not found`);
        }
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('hash');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('created_at');
        expect(result).toHaveProperty('updated_at');
        expect(result).toHaveProperty('active');
    });

    test('get employee by not hash', async () => {
        const repository = new EmployeeRepository();

        const getEmployeeHashUsecase = new GetEmployeeByHashUsecase(repository);
        const codigo = CRC32.str('');
        const hash = (codigo >>> 0).toString(16).padStart(8, '0');
        const result = await getEmployeeHashUsecase.execute(hash);

        expect(result).toBeNull();
    });
});
