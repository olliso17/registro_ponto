import { describe, expect, test } from 'vitest';
import { WorkedHours } from './workedHours';

describe('Employee Entity', () => {

    test('it must be possible to create Employee', () => {
        const props = {
            employee_id: "123e4567-e89b-12d3-a456-426614174000",
            type_id: "10daeb7f-50c6-46e8-93a7-59e263e2bf2d",
            hours_worked: "00h 00m"
        }
        const workedHours = new WorkedHours(props);

        expect(workedHours.employee_id).toBe('123e4567-e89b-12d3-a456-426614174000')
    });

    test('it employee_id is empty', () => {
        expect(() => {
            new WorkedHours({
                employee_id: "",
                type_id: "10daeb7f-50c6-46e8-93a7-59e263e2bf2d",
                hours_worked: "00h 00m"
            })
        }).toThrowError('Employee id is not a valid')
    });
    test('it employee_id is blank', () => {
        expect(() => {
            new WorkedHours({
                employee_id: "",
                type_id: "10daeb7f-50c6-46e8-93a7-59e263e2bf2d",
                hours_worked: "00h 00m"

            })
        }).toThrowError('Employee id is not a valid')
    });

    test('it must be possible to create WorkedHours', () => {
        const props = {
            employee_id: "123e4567-e89b-12d3-a456-426614174000",
            type_id: "10daeb7f-50c6-46e8-93a7-59e263e2bf2d",
            hours_worked: "00h 00m"
        }
        const workedHours = new WorkedHours(props);
        expect(workedHours.hours_worked).toBe('00h 00m')
    });

    test('it hours_worked incorrect', () => {
        expect(() => {
            new WorkedHours({
                employee_id: "123e4567-e89b-12d3-a456-426614174000",
                type_id: "10daeb7f-50c6-46e8-93a7-59e263e2bf2d",
                hours_worked: "a0:00:00"
            })
        }).toThrowError('hours_worked incorrect')
    });
})