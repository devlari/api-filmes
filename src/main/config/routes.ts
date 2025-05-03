import { Express, Router } from 'express';
import { pingRoutes } from '@main/routes';
import { Pool } from 'pg';

export default function setupRoutes(app: Express, pool: Pool) {
  const router = Router();
  app.use('/api', router);

  pingRoutes(router);
};
