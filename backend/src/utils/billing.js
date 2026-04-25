function createBill(subtotal) {
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = Number((subtotal + tax).toFixed(2));
  return {
    subtotal,
    tax,
    total,
    generatedAt: new Date()
  };
}

module.exports = { createBill };
