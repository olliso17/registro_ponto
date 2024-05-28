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
    async createType():Promise<TypeEntity[]>{

        try {
            const types = [
                { name: 'entrada' },
                { name: 'almoco_entrada' },
                { name: 'almoco_saida' },
                { name: 'saida' },
            
              ]
            const arrayType =[]
              for (const type of types) {
                const create =  await prisma.type.upsert({
                  where: { name: type.name },
                  update: {},
                  create: type,
                })
                const newType = new TypeEntity(create)
                arrayType.push(newType)
              } 
              return arrayType
        } catch (error) {
            throw new AppError('Failed to  get hash employee', 500);
        } finally {
            await prisma.$disconnect();
        }
     
    }
}