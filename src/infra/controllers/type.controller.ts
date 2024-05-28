
import { Request, Response } from 'express';
import { GetAllTypeUsecase } from '../../application/usecases/type/getAllType.usecase';
import { TypeRepository} from '../repositories/type/type.repository';
import { CreateTypeUsecase } from '../../application/usecases/type/createType';

class TypeController{
    private getAllTypeUsecase: GetAllTypeUsecase;
    private createTypeUsecase: CreateTypeUsecase;
    constructor(){
        const typeRepository = new TypeRepository();
        this.getAllTypeUsecase= new GetAllTypeUsecase(typeRepository)
        this.createTypeUsecase = new CreateTypeUsecase(typeRepository)
    }
    async getAllType(req: Request, res: Response): Promise<Response> {
        try {
            const type = await this.getAllTypeUsecase.execute();
            return res.status(200).json(type);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch type' });
        }
    }
    async createType(req: Request, res: Response): Promise<Response> {
        try {
            const type = await this.createTypeUsecase.execute();
            return res.status(200).json(type);
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch type' });
        }
    }
}

export default TypeController