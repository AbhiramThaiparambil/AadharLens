import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import aadhaarRoutes from './presentation/routes/aadhaar.routes.js';
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
console.log(import.meta)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let clientPath=path.join(path.resolve(__dirname),"../../client/dist")




app.use(express.static(clientPath));

app.use('/api', aadhaarRoutes);

app.get("/{*wildcard}", (req, res) => {
  res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`);
});