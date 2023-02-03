import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'dumi'
import sass from 'sass'

const { css } = sass.compile('./src/index.scss', { style: 'compressed' })

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
        link: '/components/Descriptions'
      },
      {
        title: '介绍',
        link: '/instructions'
      }
    ]
  },
  alias: {
    '@nbfe/components': resolve(__dirname, './dist/index.js')
  },
  styles: ['https://unpkg.com/antd@4.24.4/dist/antd.min.css', css],
  headScripts: []
})
