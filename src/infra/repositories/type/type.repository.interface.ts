import { TypeEntity } from "../../../domain/entities/type/type";

export default interface TypeRepositoryInterface{
    getAllType():Promise<TypeEntity[]>
    createType():Promise<TypeEntity[]>
}