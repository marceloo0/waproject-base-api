import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrderProducts } from 'modules/database/interfaces/orderProducts';
import { OrderProducts } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderProductsRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<OrderProducts>> {
    let query = OrderProducts.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'name') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('name', params.orderDirection).orderBy('name', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('name', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await OrderProducts.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<OrderProducts> {
    return OrderProducts.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IOrderProducts, transaction?: Transaction): Promise<OrderProducts> {
    return OrderProducts.query(transaction).insert(model);
  }

  public async update(model: IOrderProducts, transaction?: Transaction): Promise<OrderProducts> {
    return OrderProducts.query(transaction).updateAndFetchById(model.id, <OrderProducts>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await OrderProducts.query(transaction)
      .where({ id })
      .del();
  }
}
