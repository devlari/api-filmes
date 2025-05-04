import express, { Express } from 'express';
import helmet from 'helmet';
import setupRoutes from './routes';
import logger from '@main/tools/logger';
import cors from 'cors';
import { prismaDB } from '../infra/db';

export class AppServer {
  public app: Express

  constructor() {
    this.app = express();
  }

  async connect(): Promise<void> {
    try {
      await prismaDB.$connect(); 
      console.log('Conexão com o banco estabelecida');
    } catch (error) {
      console.log('Erro ao conectar ao banco', error);
    }
  }

  async testConnection(): Promise<void> {
    try {
      await prismaDB.$queryRaw`SELECT NOW()`; 
      logger.info('Conexão com o banco de dados bem-sucedida!');
    } catch (error) {
      logger.error('Erro ao conectar ao banco de dados:', error);
    }
  }

  async start(port: number, host = ''): Promise<void> {
    await this.connect(); 

    this.middlewares(); 
    this.routes(); 

    if (host != '') {
      this.app.listen(port, host, () =>
        logger.info(`Running on ${host}:${port}`)
      );
    } else {
      this.app.listen(port, () => logger.info(`Running on port ${port}`));
    }
  }

  // stop(): void {
  //   logger.info('Parando servidor');
  //   this.prisma.$disconnect(); 
  // }

  private middlewares(): void {
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
  }

  private routes(): void {

    setupRoutes(this.app);
  }
}
