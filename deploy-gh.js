const { readFileSync, writeFileSync } = require('fs');

const content = readFileSync('docs-dist/index.html').toString();

writeFileSync('index.html', content.replace(/\"\/umi\./g, '"https://raw.githubusercontent.com/shuoshubao/components/master/docs-dist/umi.'))
