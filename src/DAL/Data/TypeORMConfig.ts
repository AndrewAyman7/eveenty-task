import { DataSource } from 'typeorm';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { User } from '../Entities/User/UserEntity';
import { Product } from '../Entities/Product/ProductEntity';
import { Order } from '../Entities/Order/OrderEntity';
import { PaymentMethod } from '../Entities/Payment/PaymentMethodEntity';
import { OrderItem } from '../Entities/Order/OrderItemEntity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User, Product, Order, PaymentMethod, OrderItem],
  migrations: ['src/DAL/Data/Migrations/*.ts'],
});