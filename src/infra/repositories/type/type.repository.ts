import { PrismaClient } from "@prisma/client";
import  {TypeEntity}  from "../../../domain/entities/type/type";
import TypeRepositoryInterface from "./type.repository.interface";
import { AppError } from "../../../error/app.error";

const prisma = new PrismaClient();

export class TypeRepository implements TypeRepositoryInterface {
    async getAllType():Promise<TypeEntity[]> {
        try {
            const typeData = await prisma.type.findMany();

            const typeAll:TypeEntity[] = []
            typeData.map(typeData => {
                const type = new TypeEntity(typeData);
                typeAll.push(type);
            });

            return typeAll;
        } catch (error) {
            throw new AppError('Failed to  get hash employee', 500);
        } finally {
            await prisma.$disconnect();
        }
    }

}