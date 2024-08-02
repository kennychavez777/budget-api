import "reflect-metadata";
import { DataSource } from "typeorm";
import { Budget } from "./entities/Budget";
import { Category } from "./entities/Category";
import { Expense } from "./entities/Expense";
import { Income } from "./entities/Income";
import { User } from "./entities/User";
import { WayToPay } from "./entities/WayToPay";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5433,
  username: "adm",
  password: "123",
  database: "budgetdb",
  synchronize: true,
  logging: true,
  entities: [Budget, Category, Expense, Income, User, WayToPay],
  subscribers: [],
  migrations: [],
});

export const initializeDataSource = async () => {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.error('Error during Data source initialization', error);
  }
}
