require('dotenv/config')
const cronitor = require('cronitor')(process.env.CRONITOR_API_KEY)
const cron = require('node-cron')
const Backup = require('./backup.js')

let start = cronitor.wrap('background-worker', async function() {
    cron.schedule('0 21 * * *', async()=> {
        await Backup.exec()
      });
});

start();