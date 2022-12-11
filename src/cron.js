process.env.UV_THREADPOOL_SIZE =1;
const CronJob = require('cron').CronJob;
const Cron = require('./backup.js');

// Auto BackUp everyday at 21:00
// 0 21 * * *

new CronJob('4 12 * * *',async ()=> {
        await Cron.exec()
    },
  null,
  true,
);