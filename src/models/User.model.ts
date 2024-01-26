// models/User.ts
import { Table, Column, HasMany, BelongsTo, ForeignKey, DataType,Model} from 'sequelize-typescript';

@Table({
   timestamps: true ,
   tableName: "users",
   modelName: "User"
})
export class User extends Model {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })

  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
   declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare username: string;


  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare userpassword: string;

  @ForeignKey(() => Address)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare addressId: number;

  @BelongsTo(() => Address)
  public address: Readonly<() =>Address>;
}

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