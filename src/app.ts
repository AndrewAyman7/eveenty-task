import express from 'express';
import dotenv from 'dotenv';
import { AppDataSource } from './DAL/Data/TypeORMConfig';
import { MainRouter } from './Web/Routes/MainRouter';

dotenv.config();

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB error', err));

app.use(new MainRouter().getRoutes());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));