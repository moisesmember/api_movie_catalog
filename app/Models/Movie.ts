import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Collaborator from './Collaborator'

export default class Movie extends BaseModel {
  @hasMany(() => Collaborator)
  public collaboratorId: HasMany<typeof Collaborator>

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public sinopse: string

  @column()
  public authors: string

  @column()
  public url: string

  @column()
  public year: number

  @column()
  public avaliation: number
  
  @column()
  public collaborator_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
