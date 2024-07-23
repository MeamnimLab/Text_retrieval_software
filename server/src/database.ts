// src/database.ts
import 'reflect-metadata';
import { DataSource, EntityTarget, Repository } from 'typeorm';
import path from 'path';

const host = 'localhost'; 
const user = 'postgres';
const password = 'ch2172003'; 
const database = 'lycries'; 
const logging = true;
const ssl = false; 

export class Database {
  private static instance: Database;
  public dataSource: DataSource | null = null;

  private constructor() {}

  public static async getInstance(): Promise<Database> {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async getRepository<T>(entityClass: EntityTarget<T>): Promise<Repository<T>> {
    if (!this.dataSource) {
      await this.connect();
    }
    return this.dataSource.getRepository(entityClass);
  }

  public async connect(): Promise<void> {
    if (this.dataSource) {
      return;
    }

    this.dataSource = new DataSource({
      type: 'postgres',
      host: host,
      port: 5432,
      username: user,
      password: password,
      database: database,
      synchronize: true,
      logging: logging,
      ssl: ssl,
      entities: [path.join(__dirname, './entity/*.entity{.ts,.js}')],
      migrations: [],
      subscribers: []
    });

    await this.initializeConnection();
  }

  private async initializeConnection(): Promise<void> {
    try {
      await this.dataSource!.initialize();
      console.log('🛠️ Database connected successfully!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
      throw new Error(`Database connection failed`);
    }
  }
}
