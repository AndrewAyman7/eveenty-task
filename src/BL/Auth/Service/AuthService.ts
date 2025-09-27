import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../../../DAL/Repositories/UserRepository';
import { User } from '../../../DAL/Entities/User/UserEntity';


const userRepo = new UserRepository();

export class AuthService {
  async signup(email: string, password: string, name?: string): Promise<string> {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw new Error('User exists');

    const hash = await bcrypt.hash(password, 10);
    const user = await userRepo.createOne({ email, passwordHash: hash, name});

    return this.generateToken(user);
  }

  async login(email: string, password: string): Promise<string> {
    const user = await userRepo.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new Error('Invalid credentials');

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '24h' });
  }
}