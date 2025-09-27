import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  ObjectLiteral,
  UpdateResult,
} from 'typeorm';
import { IFindManyOptions } from '../../../Shared/Interfaces/IFindManyOptions';

export interface IGenericRepository<E extends ObjectLiteral> {
  createOne(data: DeepPartial<E>): Promise<E>;

  createMany(data: DeepPartial<E>[]): Promise<E[]>;

  findOne(findOneOptions: FindOneOptions<E>): Promise<E | null>;

  findMany(findManyOptions: IFindManyOptions<E>): Promise<E[]>;

  updateOne(findOptions: FindOptionsWhere<E>, data: Partial<E>): Promise<UpdateResult>;

  delete(findOptions: FindOptionsWhere<E>): Promise<string>;

  count(findManyOptions: FindManyOptions<E>): Promise<number>;

  save(entity: E): Promise<E>;

  exists(findOptions: FindManyOptions<E>): Promise<Boolean>;
}