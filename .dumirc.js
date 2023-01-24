import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'dumi'
import sass from 'sass'

console.time('aa')
const {css} = sass.compile('./docs/index.scss');
console.timeEnd('aa')

console.log(111)
console.log(css)

export default defineConfig({
  outputPath: 'dist-docs',
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
    'https://unpkg.com/antd@4.24.4/dist/antd.min.css',
    'https://unpkg.com/@nbfe/components@latest/dist/index.css'
  ]
})
