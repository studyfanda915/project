const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const { createBill } = require('../utils/billing');

function calculateSubtotal(items, menuMap) {
  return Number(
    items
      .reduce((sum, item) => {
        const price = menuMap.get(String(item.menuItem)) || 0;
        return sum + price * item.quantity;
      }, 0)
      .toFixed(2)
  );
}

exports.createOrder = (io) => async (req, res) => {
  const { tableNumber, items, paymentStatus } = req.body;
  const menuIds = items.map((item) => item.menuItem);
  const menuDocs = await MenuItem.find({ _id: { $in: menuIds } });
  const menuMap = new Map(menuDocs.map((doc) => [String(doc._id), doc.price]));

  const subtotal = calculateSubtotal(items, menuMap);
  const bill = createBill(subtotal);

  const order = await Order.create({
    tableNumber,
    items,
    paymentStatus,
    totalAmount: bill.total,
    bill
  });

  const populated = await order.populate('items.menuItem');
  io.emit('order:new', populated);

  res.status(201).json({ order: populated });
};

exports.listOrders = async (req, res) => {
  const orders = await Order.find().populate('items.menuItem').sort({ createdAt: -1 });
  res.json({ orders });
};

exports.updateOrder = (io) => async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.menuItem');
  if (!order) return res.status(404).json({ message: 'Order not found' });

  const previousStatus = order.status;
  Object.assign(order, req.body);

  if (req.body.status === 'Completed' && previousStatus !== 'Completed') {
    const subtotal = Number(order.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0).toFixed(2));
    order.bill = createBill(subtotal);
    order.totalAmount = order.bill.total;
  }

  await order.save();
  io.emit('order:updated', order);
  res.json({ order });
};
