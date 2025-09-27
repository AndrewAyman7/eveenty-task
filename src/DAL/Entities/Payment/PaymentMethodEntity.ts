import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../User/UserEntity';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @Column()
  stripePmId!: string;

  @Column()
  last4!: string;

  @Column()
  brand!: string;

  @Column()
  expMonth!: number;

  @Column()
  expYear!: number;
}