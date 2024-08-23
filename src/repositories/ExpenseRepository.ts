import { Repository } from "typeorm";
import { Expense } from "../entities/Expense";

export class ExpenseRepository extends Repository<Expense> {}
