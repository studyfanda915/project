const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant',
  whatsappApiUrl: process.env.WHATSAPP_API_URL || '',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '',
  archiveOrders: process.env.ARCHIVE_ORDERS === 'true'
};
