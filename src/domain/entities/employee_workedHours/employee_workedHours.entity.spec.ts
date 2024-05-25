import { test, expect, describe, assert} from 'vitest';
import { EmployeeWorkedHours } from './employee_workedHours';
import { WorkedHours } from '../workedHours/workedHours';

describe('Employee Entity', ()=>{

    test('it must be possible to create Employee', () => {
        const props = {
            employee_id: "123e4567-e89b-12d3-a456-426614174000",
            worked_hours_id:"123e4567-e89b-12d3-a456-426614174033"
        }
        const employeeWorkedHours= new EmployeeWorkedHours(props);
        expect(employeeWorkedHours.worked_hours_id).toBe('123e4567-e89b-12d3-a456-426614174033')
        expect(employeeWorkedHours.employee_id).toBe('123e4567-e89b-12d3-a456-426614174000')
    });

    test('it employee_id is empty', () => {
        expect(() =>{ new EmployeeWorkedHours({
            employee_id: "",
            worked_hours_id:"123e4567-e89b-12d3-a456-426614174033"
        })}).toThrowError('Employee id is not a valid')
    });
    test('it employee_id is blank', () => {
        expect(() =>{ new EmployeeWorkedHours({
            employee_id: "",
            worked_hours_id:"123e4567-e89b-12d3-a456-426614174033"
        })}).toThrowError('Employee id is not a valid')
    });
    test('it employee_id is empty', () => {
        expect(() =>{ new EmployeeWorkedHours({
            employee_id: "123e4567-e89b-12d3-a456-426614174000",
            worked_hours_id:""
        })}).toThrowError('Worked hours id is not a valid')
    });
    test('it employee_id is blank', () => {
        expect(() =>{ new EmployeeWorkedHours({
            employee_id: "123e4567-e89b-12d3-a456-426614174000",
            worked_hours_id:"   "
        })}).toThrowError('Worked hours id is not a valid')
    });
})