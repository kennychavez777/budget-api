import { Repository } from "typeorm";
import { Budget } from '../entities/Budget';

export class BudgetRepository extends Repository<Budget> {}
