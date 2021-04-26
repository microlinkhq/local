'use strict'

const VM_OPTS = {
  require: {
    builtin: ['path', 'url'],
    external: {
      modules: [
        '@aws-sdk/client-s3',
        '@metascraper',
        'async',
        'browserless',
        'got',
        'ioredis',
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
