import { classNames } from '@nbfe/tools'
import { kebabCase } from 'lodash'

export const componentName = 'DynamicDescriptions'

export const prefixClassName = kebabCase(componentName)

export const getClassNames = (...args) => {
  return classNames(args)
    .split(' ')
    .map(v => {
      return [prefixClassName, v].filter(Boolean).join('-')
    })
    .join(' ')
}

export const defaultColumn = {
  key: '',
  label: '',
  name: '',
  visible: true,
  tooltip: '',
  transform: null, // 数据转换器
  render: null, // 自定义渲染函数
  template: {
    tpl: 'text',
    emptyText: '--'
  }
}
