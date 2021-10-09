#!/usr/bin/env node

'use strict'

require('update-notifier')({ pkg: require('../package.json') }).notify()

const browserlessFunction = require('@browserless/function')
const { cli, print, exit } = require('@microlink/cli')
const { readFile } = require('fs').promises
const prettyMs = require('pretty-ms')
const colors = require('picocolors')
const { statSync } = require('fs')

const { VM_OPTS } = require('./constants')

const getFileSize = filepath => statSync(filepath).size

const run = async cli => {
  const [filepath, url] = cli.input
  const code = await readFile(filepath)
  const myFn = browserlessFunction(code, { vmOpts: VM_OPTS })
  const spinner = print.spinner()

  console.log()
  spinner.start()

  const { isFulfilled, value, reason } = await myFn(url, cli.flags)
  const duration = spinner.stop()
  const info = colors.gray(
    `${print.bytes(getFileSize(filepath))} in ${prettyMs(duration)}`
  )

  if (isFulfilled) {
    print.json(value, cli.flags)
    console.log()
    console.log(print.label('success', 'green'), info)
  } else {
    if (reason.stack) print.json(reason.stack, cli.flags)
    else print.json(reason.message, cli.flags)
    console.log()
    console.log(print.label('fail', 'red'), info)
  }
}

if (cli.input.length < 2) {
  console.log(require('./help'))
  process.exit(0)
}

exit(run(cli), cli)
