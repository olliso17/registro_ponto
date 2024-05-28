import { test, expect, describe} from 'vitest';
import { Employee } from './employee';

describe('Employee Entity', ()=>{

    test('it must be possible to create Employee', () => {
        const props = {
            name: "Patricia"
        }
        const employee = new Employee(props);
        expect(employee).toHaveProperty('id')
        expect(employee.name).toBe('Patricia')
    });

    test('it name is empty', () => {
        expect(() =>{ new Employee({
            name: ""
        })}).toThrowError('Name is not a valid employee')
    });

    test('it name is blank', () => {
        expect(() =>{ new Employee({
            name: "   "
        })}).toThrowError('Name is not a valid employee')
    });
})