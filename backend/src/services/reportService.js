const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
const Order = require('../models/Order');

const exportDir = path.join(process.cwd(), 'exports');

if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

async function buildOrderSnapshot() {
  return Order.find().populate('items.menuItem').sort({ createdAt: -1 }).lean();
}

async function generatePdf(orders, timestamp) {
  const pdfPath = path.join(exportDir, `orders-${timestamp}.pdf`);
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(pdfPath));

  doc.fontSize(18).text('Restaurant Order Report', { underline: true });
  doc.moveDown();

  orders.forEach((order) => {
    doc
      .fontSize(11)
      .text(
        `Order ${order._id} | Table ${order.tableNumber} | ${order.status} | ${order.paymentStatus} | $${order.totalAmount}`
      );
  });

  doc.end();
  return pdfPath;
}

async function generateExcel(orders, timestamp) {
  const filePath = path.join(exportDir, `orders-${timestamp}.xlsx`);
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Orders');

  worksheet.columns = [
    { header: 'Order ID', key: 'id', width: 28 },
    { header: 'Table', key: 'table', width: 10 },
    { header: 'Status', key: 'status', width: 14 },
    { header: 'Payment', key: 'payment', width: 12 },
    { header: 'Assigned', key: 'assigned', width: 16 },
    { header: 'Total', key: 'total', width: 12 },
    { header: 'Created At', key: 'createdAt', width: 24 }
  ];

  orders.forEach((order) => {
    worksheet.addRow({
      id: String(order._id),
      table: order.tableNumber,
      status: order.status,
      payment: order.paymentStatus,
      assigned: order.assignedTo || '-',
      total: order.totalAmount,
      createdAt: new Date(order.createdAt).toISOString()
    });
  });

  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

async function generateReports() {
  const orders = await buildOrderSnapshot();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const pdfPath = await generatePdf(orders, timestamp);
  const excelPath = await generateExcel(orders, timestamp);
  return { pdfPath, excelPath, count: orders.length };
}

module.exports = { generateReports };
