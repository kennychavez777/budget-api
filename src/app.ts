import "reflect-metadata";
import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
import { errorHandler } from "./utils/errorHandler";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config";
import './controllers/WayToPayController';
import './controllers/CategoryController';
import './controllers/UserController';
import './controllers/IncomeController';
import './controllers/BudgetController';

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// // app.use('/api/wtp', wtpRouter);
// app.use(errorHandler);

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(express.json());
});

const app = server.build();

export default app;
