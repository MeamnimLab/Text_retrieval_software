import express from 'express';
import songRoutes from './song.routes'; // Ensure correct path to your song.routes file

export const routesInit = (app: express.Application) => {
  app.use('/api/songs', songRoutes);
};
