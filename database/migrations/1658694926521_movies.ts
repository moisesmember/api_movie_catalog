import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'movies'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('genre')
      table.text('description')
      table.text('sinopse')
      table.text('authors')
      table.text('url')
      table.integer('year')
      table.integer('avaliation')
     
      table.bigint('collaborator_id').unsigned().references("collaborators.id").onDelete('CASCADE').onUpdate('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
