#!/usr/bin/env node

'use strict'

require('update-notifier')({ pkg: require('../package.json') }).notify()

const browserlessFunction = require('@browserless/function')
const { cli, print, exit } = require('@microlink/cli')
const { readFile } = require('fs').promises
const timeSpan = require('time-span')
const prettyMs = require('pretty-ms')
const { gray, green, red } = require('picocolors')
const { statSync } = require('fs')
const path = require('path')

const { VM_OPTS } = require('./constants')

const getFileSize = filepath => statSync(filepath).size

const run = async cli => {
  const [filepath, url] = cli.input
  const code = await readFile(filepath)
  const myFn = browserlessFunction(code, { vmOpts: VM_OPTS })

  if (cli.flags.pretty) {
    console.log()
    console.log(green(`  file: \`${path.resolve(filepath)}\``))
    console.log(green(`target: \`${url}\``))
    console.log()
  }

  let duration = timeSpan()
  const { isFulfilled, value, reason } = await myFn(url, cli.flags)

  duration = duration()

  const info = gray(
    `${print.bytes(getFileSize(filepath))} in ${prettyMs(duration)}`
  )

  if (isFulfilled) {
    print.json(value, cli.flags)
    console.log()
    console.log(print.label('success', 'green'), info)
  } else {
    console.log()
    console.log(red(reason.stack || reason.message))
    console.log()
    console.log(print.label('fail', 'red'), info)
  }
}

if (cli.input.length < 2) {
  console.log(require('./help'))
  process.exit(0)
}

exit(run(cli), cli)
