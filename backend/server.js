// backend/server.js
require('dotenv').config();
const app = require('./src/app');
const initDatabase = require('./src/config/initDb');

const PORT = process.env.PORT || 5004;

/**
 * Boots the server by initializing the database migrations and starting the Express listener.
 */
async function startServer() {
  try {
    // 1. Initialize PostgreSQL database (Port 5433)
    await initDatabase();
    
    // 2. Start Express Listener
    app.listen(PORT, () => {
      console.log(`🚀 Node.js Express Server successfully started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start the server due to initialization failure:', err.message);
    process.exit(1);
  }
}

startServer();
