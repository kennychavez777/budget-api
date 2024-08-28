import "reflect-metadata";
import { DataSource } from "typeorm";
import { Budget } from "./entities/Budget";
import { Category } from "./entities/Category";
import { Expense } from "./entities/Expense";
import { Income } from "./entities/Income";
import { User } from "./entities/User";
import { WayToPay } from "./entities/WayToPay";
import { db_credentials } from "./utils/keys.secret";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: db_credentials.host,
  port: db_credentials.port,
  username: db_credentials.username,
  password: db_credentials.pass,
  database: db_credentials.dbname,
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
