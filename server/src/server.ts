// src/server.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Database } from './database';  // Import the Database class

export const app = express();
export const port = 3000;

export const initializeMiddlewares = () => {
  app.use(express.json());
  app.use(cors());
};

export const startServer = async () => {
  try {
    const db = await Database.getInstance();
    await db.connect(); 
    initializeMiddlewares();

    app.listen(port, () => {
      console.log(`🚀 App listening on the port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }

  return app;
};

// Call startServer if this file is run directly
if (require.main === module) {
  startServer();
}
