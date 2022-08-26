const { readFileSync, writeFileSync } = require('fs')

const content = readFileSync('dist-docs/index.html').toString()

writeFileSync('index.html', content.replace(/\"\/umi\./g, '"./dist-docs/umi.'))
