/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  await knex.schema.createTable('contract_types', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('contract_parties', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('type').notNullable(); // company, school
    table.string('document').notNullable(); // CNPJ ou CPF
    table.string('contact_name');
    table.string('contact_phone');
    table.string('contact_email');
    table.timestamps(true, true);
  });

  await knex.schema.createTable('contracts', (table) => {
    table.increments('id').primary();
    table.integer('contract_type_id').unsigned().notNullable()
      .references('id').inTable('contract_types');
    table.integer('client_id').unsigned().notNullable()
      .references('id').inTable('contract_parties');
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.decimal('value', 15, 2).notNullable();
    table.string('status').notNullable().defaultTo('active'); // active, expired, canceled
    table.timestamps(true, true);
  });

  await knex.schema.createTable('contract_terms', (table) => {
    table.increments('id').primary();
    table.integer('contract_id').unsigned().notNullable()
      .references('id').inTable('contracts');
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  await knex.schema.dropTableIfExists('contract_terms');
  await knex.schema.dropTableIfExists('contracts');
  await knex.schema.dropTableIfExists('contract_parties');
  await knex.schema.dropTableIfExists('contract_types');
}
