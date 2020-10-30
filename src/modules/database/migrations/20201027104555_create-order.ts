import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('OrderProducts', table => {
    table.increments('id').primary();

    table.string('name', 100).notNullable();
    table.string('description', 500).notNullable();
    table.integer('quantity').notNullable();
    table.decimal('price', 8, 2).notNullable();

    table.dateTime('createdDate').notNullable();
    table.dateTime('updatedDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('OrderProducts');
}
