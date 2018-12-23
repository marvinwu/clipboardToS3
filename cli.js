#! /usr/local/bin/node
const tempy = require('tempy')
const program = require('commander')
const {
    uploadS3File
} = require('./index')
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
