import { Table, Column, HasMany, BelongsTo, ForeignKey, DataType,Model} from 'sequelize-typescript';
import {User} from './User'

@Table ({
    tableName: "addresses",
    modelName: "Address"
  })
  export class Address extends Model {
    
    @Column({
      type: DataType.INTEGER,
      autoIncrement: true,
      primaryKey: true
    })
    declare id: number
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    declare address: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
      unique: true,
    })
    declare postcode: string;
  
    @HasMany(() => User)
    familymembers: User[];
  }