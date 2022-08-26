import React from 'react'
import { version } from 'antd'
import { inRange, kebabCase } from 'lodash'
import { classNames, getTooltipHtml } from '@nbfe/tools'

export const isAntdV3 = inRange(parseInt(version, 10), 3, 4)

export const isAntdV4 = inRange(parseInt(version, 10), 4, 5)

export const componentName = 'DynamicTable'

export const prefixClassName = kebabCase(componentName)

export const getComponentName = (compName = '') => {
  return [componentName, compName].join('')
}

export const getClassNames = (...args) => {
  return classNames(args)
    .split(' ')
    .map(v => {
      return [prefixClassName, v].join('-')
    })
    .join(' ')
}

// Tooltip 支持链接的写法
export const getTooltipTitleNode = tooltip => {
  return getTooltipHtml(tooltip).map((v, i) => {
    return <div key={[i].join()} dangerouslySetInnerHTML={{ __html: v }} />
  })
}
