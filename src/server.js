require('dotenv/config')
const chalk = require("chalk")
const cronitor = require('cronitor')(process.env.CRONITOR_API_KEY)
const cron = require('node-cron')
const backup = require('./backup.js')

let start = cronitor.wrap('background-worker', async function () {
  console.log(
    chalk.white(`Waiting: `),
    chalk.blue.bold(new Date().toISOString())
  )
  
  cron.schedule('* * * * *', async () => {   
    await backup.exec()
  })
})

start()