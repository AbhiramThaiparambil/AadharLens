import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import aadhaarRoutes from './presentation/routes/aadhaar.routes.js';
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use('/api', aadhaarRoutes);
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});