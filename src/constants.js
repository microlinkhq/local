'use strict'

const VM_OPTS = {
  console: 'inherit',
  require: {
    builtin: ['path', 'url'],
    external: {
      modules: [
        '@aws-sdk/client-s3',
        '@metascraper',
        '@mozilla/readability',
        'async',
        'browserless',
        'cheerio',
        'got',
        'ioredis',
        'jsdom',
        'lodash',
        'metascraper-',
        'metascraper',
        'p-reflect',
        'p-retry',
        'p-timeout'
      ]
    }
  }
}

module.exports = { VM_OPTS }
