import 'dotenv/config';
import express, { query } from 'express';
import https from 'https';
import cors from 'cors';
import models from './models/models.js'; // don't delete!!!
import router from './routes/index.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert { type: 'json' };
import { sequelize } from './db/db.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mode = process.env.MODE;
const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_HOST,
      'http://localhost:5173',
      'http://localhost:4173',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use(cookieParser());
app.use('/api', router);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorMiddleware);

const startProd = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();

    const httpsServer = https.createServer(
      {
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem')),
      },
      app
    );

    httpsServer.listen(PORT, () => {
      console.log(`Server run on port: ${PORT}, https protocol`);
    });
  } catch (e) {
    console.log(e);
  }
};

const startDev = async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server run on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

if (mode === 'development') {
  startDev();
} else {
  startProd();
}
