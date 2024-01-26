import { Sequelize } from 'sequelize-typescript';

import { User,  } from './models/User';
import { Address } from './models/Address';

const sequelize = new Sequelize({
  database: 'test',
  host: 'localhost',
  username: 'postgres',
  password: 'password',
  port: 5432,
  dialect: 'postgres',
  repositoryMode: true,
});

sequelize.addModels([Address, User]);

export default sequelize;