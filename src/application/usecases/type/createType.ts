import { TypeEntity } from "../../../domain/entities/type/type";
import TypeRepositoryInterface from "../../../infra/repositories/type/type.repository.interface";

export class CreateTypeUsecase{
    constructor(private typeRepository: TypeRepositoryInterface) {}
        async execute():Promise<TypeEntity[]>{
            return this.typeRepository.createType();
        }
    
}