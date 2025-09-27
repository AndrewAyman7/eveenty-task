import { FindManyOptions } from 'typeorm';

export interface IFindManyOptions<E> extends FindManyOptions<E> {
  pageNumber?: number;
  pageSize?: number;
}
