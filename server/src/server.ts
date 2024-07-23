import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { Database } from './database';
import { routesInit } from './routes/config.routes'; // Ensure correct path

export const app = express();
export const port = 3000;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

export const startServer = async () => {
  try {
    const db = await Database.getInstance();
    await db.connect();

    // Initialize routes
    routesInit(app);

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
