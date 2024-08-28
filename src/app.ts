import "reflect-metadata";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { errorHandler } from "./utils/errorHandler";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./inversify.config";
import './controllers/WayToPayController';
import './controllers/CategoryController';
import './controllers/UserController';
import './controllers/IncomeController';
import './controllers/BudgetController';
import './controllers/ExpenseController';

const server = new InversifyExpressServer(container);
dotenv.config();

server.setConfig((app) => {
  app.use(express.json());
  app.use(cors());
});

const app = server.build();

export default app;
