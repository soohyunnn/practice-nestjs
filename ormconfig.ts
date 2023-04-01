import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 13306,
  username: 'root',
  password: 'test',
  database: 'test',
  entities: [__dirname + '/**/*.entity{.js, .ts}'],
  synchronize: false,
  migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migration',
});
