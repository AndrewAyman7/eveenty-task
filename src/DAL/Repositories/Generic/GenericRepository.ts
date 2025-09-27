import { DeepPartial, EntityTarget, FindOneOptions, FindOptionsWhere, ObjectLiteral, Repository, UpdateResult } from 'typeorm';
import { AppDataSource } from '../../Data/TypeORMConfig';
import { IGenericRepository } from './IGenericRepository';

export class GenericRepository<E extends ObjectLiteral> implements IGenericRepository<E> {
  private repo: Repository<E>;

  constructor(EntityClass: EntityTarget<E>) {
    this.repo = AppDataSource.getRepository(EntityClass);
  }

  async createOne(data: DeepPartial<E>): Promise<E> {
    const createdData = this.repo.create(data);
    const result = await this.repo.save(createdData);
    return result;
  }

  async createMany(data: DeepPartial<E>[]): Promise<E[]> {
    const createdData = this.repo.create(data);
    const result = await this.repo.save(createdData);
    return result;
  }

  public getRepo() {
    return this.repo;
  }

  async findOne(findOneOptions: FindOneOptions<E>): Promise<E | null> {
    const row = await this.repo.findOne(findOneOptions);
    return row;
  }

  async findMany(findManyOptions: FindOneOptions<E>): Promise<E[]> {
    const results = await this.repo.find(findManyOptions);
    return results;
  }

  async updateOne(findOptions: FindOptionsWhere<E>, data: Partial<E>): Promise<UpdateResult> {
    const result = await this.repo.update(findOptions, data);
    return result;
  }

  async updateMany(data: DeepPartial<E>[]): Promise<E[]> {
    const updatedEntities = await this.repo.save(data);
    return updatedEntities;
  }

  async delete(findOptions: FindOptionsWhere<E>): Promise<string> {
    await this.repo.delete(findOptions);
    return `${this.name} has been deleted successfully`;
  }

  async count(findManyOptions: FindOneOptions<E>): Promise<number> {
    const count = await this.repo.count(findManyOptions);
    return count;
  }

  async save(entity: E): Promise<E> {
    return this.repo.save(entity);
  }

  async exists(findOptions: FindOneOptions<E>): Promise<boolean> {
    return this.repo.exists(findOptions);
  }

  get name(): string {
    return this.repo.metadata.name;
  }
}