const s3 = require('s3-node-client')
const path = require('path')
const pEvent = require('p-event')
const randomstring = require('randomstring')

var client = s3.createClient({
  s3Options: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.BUCKET_REGION
  }
})

async function uploadS3File (imgName, bucketName) {
  let s3PathName = `screencap/${randomstring.generate(10)}${path.basename(imgName)}`
  var params = {
    localFile: imgName,

    s3Params: {
      Bucket: process.env.BUCKET_NAME,
      Key: s3PathName
    }
  }
  await pEvent(client.uploadFile(params), 'end')
  return `${process.env.BUCKET_PUBLIC_URI}/${s3PathName}`
}

module.exports = {
  uploadS3File
}
