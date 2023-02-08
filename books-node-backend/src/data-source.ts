import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PlatformTools } from 'typeorm/platform/PlatformTools';
import { Book } from './entity/Book';
import { User } from './entity/User';

// The configurations for connecting to the DataBase
export const AppDataSource = new DataSource({
  type: 'mariadb',
  host: 'mariadb',
  port: 3306,
  username: 'root',
  password: 'MYSQL_ROOT_PASSWORD',
  database: 'book_database',
  logging: false,
  entities: [User, Book],
  migrations: [],
  subscribers: [],
});
