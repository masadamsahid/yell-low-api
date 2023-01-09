import { DataSource, DataSourceOptions } from "typeorm";

import * as dotenv from 'dotenv';
import { userRoles1673227492408 } from "./migrations/1673227492408-user-roles";
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
  type: <'mysql'|'postgres'|'mariadb'>process.env.DB_TYPE || 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['dist/src/db/**/*.entity{.ts,.js}'],
  migrations: [userRoles1673227492408],
  migrationsTableName: 'migrations_table',
  // synchronize: true,
}

const dataSource: DataSource = new DataSource(dataSourceOptions);
export default dataSource;