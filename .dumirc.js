import { defineConfig } from 'dumi'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const isDevelopment = process.env.NODE_ENV === 'development'

export default defineConfig({
  publicPath: isDevelopment ? '/' : 'https://shuoshubao.github.io/components/',
  resolve: {
    docDirs: ['docs-md']
  },
  outputPath: 'docs',
  history: {
    type: 'hash'
  },
  polyfill: false,
  targets: {
    chrome: 100
  },
  externals: {},
  favicons: ['https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png'],
  themeConfig: {
    name: '组件库',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/rlpTLlbMzTNYuZGGCVYM.png',
    prefersColor: {
      switch: false,
      default: 'light'
    },
    footer: false,
    nav: [
      {
        title: '组件',
        link: '/components/Table'
      },
      {
        title: '介绍',
        link: '/instructions'
      }
    ]
  },
  alias: {
    '@nbfe/components': resolve(__dirname, './dist/index.esm.js')
  },
  styles: ['https://registry.npmmirror.com/antd/4.24.4/files/dist/antd.min.css', readFileSync(resolve(__dirname, './src/dumi.css')).toString()],
  headScripts: []
})
