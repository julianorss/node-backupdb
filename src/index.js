const backup = require('./backup.js')

async function backupDB() {
    await backup.exec()
}

backupDB()