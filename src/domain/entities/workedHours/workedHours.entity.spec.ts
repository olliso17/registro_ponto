import { test, expect, describe, assert} from 'vitest';
import { WorkedHours } from './workedHours';

describe('WorkedHours Entity', ()=>{

    test('it must be possible to create WorkedHours', () => {
        const props = {
            hours_worked: "00:00:00"
        }
        const workedHours = new WorkedHours(props);
        expect(workedHours).toHaveProperty('id')
        expect(workedHours.hours_worked).toBe('00:00:00')
    });

    test('it hours_worked incorrect', () => {
        expect(() =>{ new WorkedHours({
            hours_worked: "a0:00:00"
        })}).toThrowError('hours_worked incorrect')
    });
})
