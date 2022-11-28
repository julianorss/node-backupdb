require('dotenv/config')
const mysqldump = require('mysqldump')
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const backupDirPath = path.join(__dirname, 'database-backup')
console.log(backupDirPath)

exports.exec = async () => {
    const backupPath = 'database-backup/'
    const fileName = `backup-${Math.round(Date.now() / 1000)}.dump.sql`
    
    const res = backupPath + fileName
    await mysqldump({
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
        dumpToFile: res,
    });
    
    await this.upload(fileName)
}

exports.upload = async (fileName) => {
	// Read content from the file
	console.log('reading file')
	const fileContent = fs.readFileSync(backupDirPath + '/' + fileName)
	console.log('file readed')
	// Setting up S3 upload parameters
	const key = process.env.AWS_BUCKET_FOLDER + '/' + fileName
	const params = {
		Bucket: process.env.AWS_BUCKET,
		Key: key, // File name you want to save as in S3
		Body: fileContent
	}
	// Uploading files to the bucket
	console.log('uploading...');
	await s3.upload(params, function (err, data) {
		if (err) {
			throw err
		}
		console.log(`File uploaded successfully. ${data.Location}`)
	}).promise()
	console.log('uploaded!')
};