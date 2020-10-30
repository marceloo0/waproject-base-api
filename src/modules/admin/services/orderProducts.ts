import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { IOrderProducts } from 'modules/database/interfaces/orderProducts';
import { OrderProducts } from 'modules/database/models/order';

import { OrderProductsRepository } from '../repositories/orderproducts';

@Injectable()
export class OrderProductsService {
  constructor(private orderProductsRepository: OrderProductsRepository) {}

  public async save(model: IOrderProducts): Promise<OrderProducts> {
    if (!model.name) throw new BadRequestException('invalid-name');

    if (!model.description) throw new BadRequestException('invalid-description');

    if (!model.quantity) throw new BadRequestException('invalid-quantity');

    if (!model.price) throw new BadRequestException('invalid-price');

    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(orderId: number): Promise<void> {
    const order = await this.orderProductsRepository.findById(orderId);

    if (!order) throw new NotFoundException('not-found');

    return this.orderProductsRepository.remove(orderId);
  }

  private async create(model: IOrderProducts): Promise<OrderProducts> {
    const order = await this.orderProductsRepository.insert(model);
    return order;
  }

  private async update(model: IOrderProducts): Promise<OrderProducts> {
    const order = await this.orderProductsRepository.findById(model.id);

    if (!order) throw new NotFoundException('not-found');

    return this.orderProductsRepository.update({ ...order, ...model });
  }
}
