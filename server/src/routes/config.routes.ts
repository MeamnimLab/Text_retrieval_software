import express from 'express'
import songRoutes from './song.routes'
import wordRoutes from './word.routes'
import groupRoutes from './group.routes'


export const routesInit = (app: express.Application) => {
  app.use('/api/songs', songRoutes);
  app.use('/api/groups', groupRoutes);
  app.use('/api/words', wordRoutes);


};
