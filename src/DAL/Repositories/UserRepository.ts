import { User } from '../Entities/User/UserEntity';
import { GenericRepository } from './Generic/GenericRepository';

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}