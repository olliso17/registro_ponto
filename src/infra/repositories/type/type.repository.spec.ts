import { describe, expect, test } from 'vitest';
import { TypeEntity } from '../../../domain/entities/type/type';
import { TypeRepository } from './type.repository';

describe('Type Repository', () => {

    const typeReppository = new TypeRepository()
    test('not create employee', async () => {
        const types: TypeEntity[] = await typeReppository.getAllType()

        await expect(types).toHaveLength(types.length)
    });
});