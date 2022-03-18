const { readFileSync, writeFileSync } = require('fs');

const content = readFileSync('dist/index.html').toString();

writeFileSync('index.html', content.replace(/\"\/umi\./g, '"./dist/umi.'))
