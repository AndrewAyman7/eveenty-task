import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../../../Shared/Enums/UserRole.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  email!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: UserRole.USER })
  role!: UserRole;

  @Column({ type: 'varchar', nullable: true })
  stripeCustomerId!: string | null;

  @Column({ nullable: true })
  name?: string;
}