const Order = require('../models/Order');
const ArchivedOrder = require('../models/ArchivedOrder');
const env = require('../config/env');

async function enforceRetentionPolicy() {
  const cutoff = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const staleOrders = await Order.find({ createdAt: { $lt: cutoff } }).lean();

  if (env.archiveOrders && staleOrders.length) {
    await ArchivedOrder.insertMany(
      staleOrders.map((order) => ({
        originalId: order._id,
        payload: order,
        archivedAt: new Date()
      }))
    );
  }

  await Order.deleteMany({ createdAt: { $lt: cutoff } });
}

module.exports = { enforceRetentionPolicy };
