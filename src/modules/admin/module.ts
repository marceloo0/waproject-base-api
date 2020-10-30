import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { OrderProductsController } from './controllers/orderProducts';
import { TestController } from './controllers/test';
import { UserController } from './controllers/user';
import { RenewTokenMiddleware } from './middlewares/renewToken';
import { OrderProductsRepository } from './repositories/orderproducts';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { OrderProductsService } from './services/orderProducts';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, UserController, TestController, OrderProductsController],
  providers: [AuthService, UserRepository, UserService, OrderProductsRepository, OrderProductsService]
})
export class AdminModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(RenewTokenMiddleware).forRoutes('*');
  }
}
