import 'reflect-metadata';
import { Container } from 'inversify';
import { IWayToPayService } from './interfaces/IWayToPayService';
import { WayToPayService } from './services/WayToPayService';
import { TYPES } from './types';
import { Repository } from 'typeorm';
import { WayToPay } from './entities/WayToPay';
import { AppDataSource } from './data-source';
import { Category } from './entities/Category';
import { ICategoryService } from './interfaces/ICategoryService';
import { CategoryService } from './services/CategoryService';
import { User } from './entities/User';
import { IUserService } from './interfaces/IUserService';
import { UserService } from './services/UserService';
import { Income } from './entities/Income';
import { IIncomeService } from './interfaces/IIncomeService';
import { IncomeService } from './services/IncomeService';

const container = new Container();
const _wayToPayRepository = AppDataSource.getRepository(WayToPay);
const _categoryRepository = AppDataSource.getRepository(Category);
const _userRepository = AppDataSource.getRepository(User);
const _incomeRepository = AppDataSource.getRepository(Income);

container.bind<Repository<WayToPay>>(TYPES.WayToPayRepository).toConstantValue(_wayToPayRepository);
container.bind<IWayToPayService>(TYPES.IWayToPayService).to(WayToPayService);

container.bind<Repository<Category>>(TYPES.CategoryRepository).toConstantValue(_categoryRepository);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);

container.bind<Repository<User>>(TYPES.UserRepository).toConstantValue(_userRepository);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

container.bind<Repository<Income>>(TYPES.IncomeRepository).toConstantValue(_incomeRepository);
container.bind<IIncomeService>(TYPES.IIncomeService).to(IncomeService);

export { container };
