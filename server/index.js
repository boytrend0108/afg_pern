import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models from './models/models.js';
import router from './routes/index.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };
import { sequelize } from './db/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('../server/static'));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
