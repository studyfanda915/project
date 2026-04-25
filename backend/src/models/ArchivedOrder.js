const mongoose = require('mongoose');

const archivedOrderSchema = new mongoose.Schema(
  {
    originalId: mongoose.Schema.Types.ObjectId,
    payload: Object,
    archivedAt: { type: Date, default: Date.now }
  },
  { timestamps: false }
);

module.exports = mongoose.model('ArchivedOrder', archivedOrderSchema);
