const axios = require('axios');
const env = require('../config/env');

async function sendReportToWhatsApp({ pdfPath, excelPath, count }) {
  if (!env.whatsappApiUrl || !env.whatsappNumber) {
    console.warn('WhatsApp API is not configured. Skipping report delivery.');
    return;
  }

  await axios.post(env.whatsappApiUrl, {
    number: env.whatsappNumber,
    message: `2-hour report: ${count} orders exported.`,
    files: [pdfPath, excelPath]
  });
}

module.exports = { sendReportToWhatsApp };
