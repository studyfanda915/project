const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const env = require('./config/env');
const menuRoutes = require('./routes/menuRoutes');
const createOrderRouter = require('./routes/orderRoutes');
const { enforceRetentionPolicy } = require('./jobs/retentionJob');
const { startExportJob } = require('./jobs/exportJob');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(process.cwd(), 'src/uploads')));

app.get('/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));
app.use('/api/menu', menuRoutes);
app.use('/api/orders', createOrderRouter(io));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Unexpected server error' });
});

async function bootstrap() {
  await connectDB();
  await enforceRetentionPolicy();
  startExportJob();

  setInterval(() => {
    enforceRetentionPolicy().catch((err) => {
      console.error('Retention job failed', err.message);
    });
  }, 60 * 60 * 1000);

  server.listen(env.port, () => {
    console.log(`Backend running on port ${env.port}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});
