const cron = require('node-cron');
const conn = require('../Config/db');

// Schedule a task to run every day at midnight
cron.schedule('* * * * *', async () => {
  try {
    const [result] = await conn.query('DELETE FROM tbl_otp WHERE created_at < NOW() - INTERVAL 1 DAY');
    console.log('Old OTPs deleted successfully');
  } catch (err) {
    console.error('Error deleting old OTPs:', err);
  }
});
 