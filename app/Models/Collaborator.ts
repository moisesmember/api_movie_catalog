import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Movie from './Movie'

export default class Collaborator extends BaseModel {
  
  @hasOne(() => Movie)
  public movie: HasOne<typeof Movie>
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: String

  @column()
  public username: String

  @column()
  public password: String

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
