import { Sequelize } from 'sequelize-typescript';

import { Address, User,  } from './models/User.model';
const sequelize = new Sequelize({
  database: 'test',
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  port: 5432,
  dialect: 'postgres'
});

sequelize.addModels([Address, User]);

export default sequelize;