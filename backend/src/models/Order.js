const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    tableNumber: { type: String, required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
        quantity: { type: Number, required: true, min: 1 }
      }
    ],
    status: {
      type: String,
      enum: ['Pending', 'Preparing', 'Completed'],
      default: 'Pending'
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid'],
      default: 'unpaid'
    },
    assignedTo: String,
    totalAmount: { type: Number, default: 0 },
    bill: {
      subtotal: Number,
      tax: Number,
      total: Number,
      generatedAt: Date
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
