#! /usr/local/bin/node
const tempy = require('tempy')
const program = require('commander')
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

async function uploadS3File(imgName, bucketName) {
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


const shell = require('shelljs')
program.command('clipboard')
    .action(async (fileName) => {
      const tempPng = tempy.file({
        extension: 'png'
      })
      shell.exec(`./pngpaste ${tempPng}`)
      const url = await uploadS3File(tempPng, 'testlander')
      console.log(url)
    })
program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
  process.exit(1)
})
program.parse(process.argv)
