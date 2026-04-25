const cron = require('node-cron');
const { generateReports } = require('../services/reportService');
const { sendReportToWhatsApp } = require('../services/whatsappService');

function startExportJob() {
  cron.schedule('0 */2 * * *', async () => {
    try {
      const report = await generateReports();
      await sendReportToWhatsApp(report);
      console.log('2-hour report exported and sent');
    } catch (error) {
      console.error('Report job failed', error.message);
    }
  });
}

module.exports = { startExportJob };
