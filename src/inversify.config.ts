import 'reflect-metadata';
import { Container } from 'inversify';
import { IWayToPayService } from './interfaces/IWayToPayService';
import { WayToPayService } from './services/WayToPayService';
import { TYPES } from './types';
import { Repository } from 'typeorm';
import { WayToPay } from './entities/WayToPay';
import { WayToPayRepository } from './repositories/WayToPayRepository';
import { AppDataSource } from './data-source';

const container = new Container();
const _wayToPayRepository = AppDataSource.getRepository(WayToPay);
container.bind<Repository<WayToPay>>(TYPES.WayToPayRepository).toConstantValue(_wayToPayRepository);
container.bind<IWayToPayService>(TYPES.IWayToPayService).to(WayToPayService);

export { container };
