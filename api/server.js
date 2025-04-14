import express from 'express';
import serverless from 'serverless-http';
import packageRoutes from '../server/routes/packageRoutes.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use('/api/packages', packageRoutes);

export const handler = serverless(app);
