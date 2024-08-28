const TYPES = {
  WayToPayRepository: Symbol.for("WayToPayRepository"),
  IWayToPayService: Symbol.for("IWayToPayService"),
  ICategoryService: Symbol.for("ICategoryService"),
  CategoryRepository: Symbol.for("CategoryRepository"),
  IUserService: Symbol.for("IUserService"),
  UserRepository: Symbol.for("UserRepository"),
  IIncomeService: Symbol.for("IIncomeService"),
  IncomeRepository: Symbol.for("IncomeRepository"),
  IBudgetService: Symbol.for("IBudgetService"),
  BudgetRepository: Symbol.for("BudgetRepository"),
  IExpenseService: Symbol.for("IExpenseService"),
  ExpenseRepository: Symbol.for("ExpenseRepository"),
};

export { TYPES };