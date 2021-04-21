'use strict'

const { gray, white } = require('chalk')

module.exports = `
${gray(`${white('microlink-local')} <file> <url> [options]`)}

Examples
  ${gray('microlink-local examples/page-title https://example.com')}
`
