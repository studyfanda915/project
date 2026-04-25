const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: String,
    visibleToCustomers: { type: Boolean, default: true },
    visibleToOwners: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
