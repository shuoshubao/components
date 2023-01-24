import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'dumi'
import sass from 'sass'

const { css } = sass.compile('./docs-entry/index.scss')

export default defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? 'https://shuoshubao.github.io/components/' : '/',
  resolve: { docDirs: ['docs-entry'] },
  outputPath: 'docs',
  history: {
    type: 'hash'
  },
  themeConfig: {
    prefersColor: {
      switch: false,
      default: 'light'
    },
    nav: [
      {
        title: 'Table',
        link: '/components/table'
      },
      {
        title: 'Form',
        link: '/components/form'
      },
      {
        title: 'Descriptions',
        link: '/components/descriptions'
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
  styles: [
    css,
    'https://unpkg.com/antd@4.24.4/dist/antd.min.css'
  ]
})
