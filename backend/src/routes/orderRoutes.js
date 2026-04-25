const express = require('express');
const authorizeRole = require('../middleware/authorizeRole');
const orderController = require('../controllers/orderController');

function createOrderRouter(io) {
  const router = express.Router();

  router.post('/', orderController.createOrder(io));
  router.get('/', authorizeRole('Owner', 'Admin'), orderController.listOrders);
  router.patch('/:id', authorizeRole('Owner', 'Admin'), orderController.updateOrder(io));

  return router;
}

module.exports = createOrderRouter;
