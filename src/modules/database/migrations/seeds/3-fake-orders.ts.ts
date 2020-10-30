import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IOrderProducts } from 'modules/database/interfaces/orderProducts';
import { IS_DEV } from 'settings';

function rand(min: number, max: number) {
  const float = Math.random() * (max - min) + min;
  return Math.floor(float);
}

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orderProducts = await knex
    .count()
    .from('OrderProducts')
    .first();

  if (Number(orderProducts.count) !== 0) return;

  for (let x = 0; x < 10; x++) {
    const name = faker.commerce.productName();
    const description = faker.commerce.productMaterial();
    const price = Number(faker.commerce.price());

    const order: IOrderProducts = {
      name,
      description,
      quantity: rand(1, 10),
      price,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('OrderProducts');
  }
}
