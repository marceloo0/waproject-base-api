import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IOrderProducts } from 'modules/database/interfaces/orderProducts';

import { OrderProductsRepository } from '../repositories/orderproducts';
import { OrderProductsService } from './orderProducts';

/* eslint-disable max-len */
describe('Admin/OrderProductsService', () => {
  let orderProductsRepository: OrderProductsRepository;
  let service: OrderProductsService;

  const orderProduct: IOrderProducts = {
    name: 'Notbook',
    description: 'Dell melhor marca',
    quantity: 10,
    price: 900
  };

  beforeEach(async () => {
    orderProductsRepository = new OrderProductsRepository();

    service = new OrderProductsService(orderProductsRepository);
  });
  it('should create a orderProduct', async () => {
    jest
      .spyOn(orderProductsRepository, 'insert')
      .mockImplementationOnce(orderProduct => Promise.resolve({ ...orderProduct } as any));

    const result = await service.save(orderProduct);

    expect(result).not.toBeFalsy();
    expect(result).toEqual(orderProduct);
  });
  it('should remove a orderProduct', async () => {
    jest.spyOn(orderProductsRepository, 'findById').mockResolvedValueOnce({ ...orderProduct } as any);
    jest.spyOn(orderProductsRepository, 'remove').mockResolvedValueOnce({ id: 1 } as any);

    await service.remove(1);
  });
  it('should throw NotFoundException when try update a not found orderProduct', async () => {
    jest.spyOn(orderProductsRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.save({ id: 1, ...orderProduct });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
  it('should throw BadRequestException with message invalid-name when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...orderProduct, name: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-name');
    }
  });
  it('should throw BadRequestException with message invalid-description when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...orderProduct, description: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-description');
    }
  });
  it('should throw BadRequestException with message invalid-quantity when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...orderProduct, quantity: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-quantity');
    }
  });
  it('should throw BadRequestException with message invalid-price when save with a invalid field', async () => {
    try {
      await service.save({ id: 1, ...orderProduct, price: null });
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(BadRequestException);
      expect(err.message.message).toBe('invalid-price');
    }
  });
  it('should throw NotFoundException when try remove a not found request', async () => {
    jest.spyOn(orderProductsRepository, 'findById').mockResolvedValueOnce(null);

    try {
      await service.remove(1);
      fail();
    } catch (err) {
      expect(err).toBeInstanceOf(NotFoundException);
    }
  });
});
