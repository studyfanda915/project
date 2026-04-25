const MenuItem = require('../models/MenuItem');

exports.listMenu = async (req, res) => {
  const visibleOnly = req.query.visible === 'true';
  const query = visibleOnly ? { visibleToCustomers: true } : {};
  const items = await MenuItem.find(query).sort({ category: 1, name: 1 });
  res.json({ items });
};

exports.createMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json({ item });
};

exports.updateMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.json({ item });
};

exports.deleteMenuItem = async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: 'Menu item not found' });
  res.status(204).send();
};
