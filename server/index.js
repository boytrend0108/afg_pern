import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models from './models/models.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

import { sequelize } from './db/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', router);

app.use(errorMiddleware);

const start = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server run on port: ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
