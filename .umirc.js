import { readFileSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'dumi'

const styles = [
  readFileSync('./src/index.css').toString(),
  readFileSync('dist/index.css').toString(),
  '.dynamic-form .ant-form-error { color: #f5222d }'
]

export default defineConfig({
  title: '组件文档',
  favicon: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
  outputPath: 'dist-docs',
  mode: 'site',
  404: false,
  hash: true,
  base: '/',
  publicPath: '/',
  history: {
    type: 'hash'
  },
  navs: [
    {
      title: 'Form',
      path: '/components/form'
    },
    {
      title: 'Table',
      path: '/components/table'
    },
    {
      title: 'Descriptions',
      path: '/components/descriptions'
    },
    {
      title: '介绍',
      path: '/instructions'
    }
  ],
  locales: [['zh-CN', '中文']],
  alias: {
    '@nbfe/components': resolve(__dirname, './lib/index.js')
  },
  links: [
    {
      rel: 'stylesheet',
      href: 'https://file.ljcdn.com/bs/antd/4.19.2/dist/antd.min.css'
    }
  ],
  styles,
  themeConfig: {
    features: false
  }
})
