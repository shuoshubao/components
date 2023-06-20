import React from 'react'
import { Button, Typography, Tag, Tooltip, Popconfirm, Modal, Dropdown, Rate, Progress, Image, Avatar } from 'antd'
import { SortableHandle } from 'react-sortable-hoc'
import { get, filter, find, omit, flatten, merge, isString, isObject, isFunction, noop } from 'lodash'
import {
  classNames,
  getLabelByValue,
  isEmptyValue,
  isEmptyObject,
  isEmptyArray,
  stringifyUrl,
  formatTime,
  thousands,
  multiply
} from '@nbfe/tools'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import { getClassNames, getTooltipTitleNode, getOnceImageFallback } from './config'
import BuiltInComponents from '../Form/components'

const { Text } = Typography

const getValue = (dataIndex, emptyText, record) => {
  const value = get(record, dataIndex)
  return isEmptyValue(value) ? emptyText : value
}

export const renderButton = (item, context) => {
  const { text, key, visible, query, tooltip, PopconfirmConfig, ModalConfirmConfig } = item
  const props = omit(item, [
    'key',
    'text',
    'visible',
    'query',
    'tooltip',
    'isMore',
    'PopconfirmConfig',
    'ModalConfirmConfig'
  ])
  const defaultProps = {
    type: 'link',
    size: 'small',
    children: text
  }
  if (!isEmptyObject(query)) {
    props.href = stringifyUrl(props.href || '', query)
  }
  if (!visible) {
    return null
  }
  const getButtonNode = (extraProps = {}) => {
    const buttonNode = <Button key={key} type="link" size="small" {...{ ...defaultProps, ...props, ...extraProps }} />
    if (tooltip) {
      return (
        <Tooltip title={getTooltipTitleNode(tooltip)} key={key}>
          {buttonNode}
        </Tooltip>
      )
    }
    return buttonNode
  }
  if (PopconfirmConfig) {
    return (
      <Popconfirm
        {...PopconfirmConfig}
        key={key}
        onConfirm={async () => {
          await PopconfirmConfig.onConfirm()
          if (context && context.handleSearch) {
            context.handleSearch({}, false)
          }
        }}
      >
        {getButtonNode()}
      </Popconfirm>
    )
  }
  if (ModalConfirmConfig) {
    const handleClick = () => {
      Modal.confirm({
        ...ModalConfirmConfig,
        onOk: async () => {
          await ModalConfirmConfig.onOk()
          if (context && context.handleSearch) {
            context.handleSearch({}, false)
          }
        }
      })
    }
    return getButtonNode({ onClick: handleClick })
  }
  return getButtonNode()
}

const DragHandle = SortableHandle(props => {
  return props.children
})

export default ({ dataIndex, transform, template }, context) => {
  if (!template) {
    return noop
  }
  return (text, record, index) => {
    const { tpl, emptyText } = template
    let value
    if (isFunction(transform)) {
      value = transform(text, record, index)
      if (isEmptyValue(value)) {
        value = emptyText
      }
    } else {
      value = getValue(dataIndex, emptyText, record)
    }
    // 拖拽手柄
    if (tpl === 'sort') {
      const { handler = <MenuOutlined.default />, disabledSort = null } = template
      const disabled = isFunction(disabledSort) ? disabledSort(record, index) : false
      const wrapClassName = classNames(getClassNames('render-sort'), {
        [getClassNames('render-sort-disabled')]: disabled
      })
      return <div className={wrapClassName}>{disabled ? handler : <DragHandle>{handler}</DragHandle>}</div>
    }
    // 行号
    if (tpl === 'numbering') {
      return index + 1
    }
    // 普通文本
    if (tpl === 'text') {
      if (value === emptyText) {
        return emptyText
      }
      const props = omit(template, ['tpl', 'emptyText', 'separator'])
      if (Array.isArray(value)) {
        if (isEmptyArray(value)) {
          return emptyText
        }
        // 分隔符
        const { separator = '' } = template
        if (separator === 'div') {
          return value.map((v, i) => {
            return <div key={[i].join()}>{v}</div>
          })
        }
        return value.join(separator)
      }
      if (props.ellipsis) {
        props.ellipsis = {
          tooltip: <div style={{ maxHeight: 400, overflowY: 'auto' }}>{value}</div>,
          ...props.ellipsis
        }
      }
      return <Text {...props}>{value}</Text>
    }
    // 枚举
    if (tpl === 'enum') {
      const { options = [], shape = 'text' } = template
      const label = getLabelByValue(value, options, emptyText)
      if (label === emptyText) {
        return label
      }
      const itemProps = omit(find(options, { value }), ['value', 'label'])
      if (shape === 'tag') {
        return (
          <Tag className={getClassNames('render-tag')} {...itemProps}>
            {label}
          </Tag>
        )
      }
      if (shape === 'circle') {
        const { color = 'rgba(0, 0, 0, 0.65)' } = itemProps
        const style = { color, border: `1px solid ${color}` }
        return (
          <span style={style} className={getClassNames(['render-enum', shape].join('-'))}>
            {label}
          </span>
        )
      }
      if (['dot', 'square'].includes(shape)) {
        const { color = 'rgba(0, 0, 0, 0.85)' } = itemProps
        return (
          <span className={getClassNames(['render-enum', shape].join('-'))}>
            <span className={getClassNames('render-enum-badge')} style={{ backgroundColor: color }} />
            <span className={getClassNames('render-enum-text')} style={{ color }}>
              {label}
            </span>
          </span>
        )
      }
      return label
    }
    // 图片
    if (tpl === 'image') {
      const { width = 50, height = 50 } = template
      const props = omit(template, ['tpl', 'emptyText'])
      const ImageProps = {
        src: value,
        alt: '',
        width,
        height,
        fallback: getOnceImageFallback(),
        ...props
      }
      if (isEmptyValue(value)) {
        ImageProps.preview = false
      }
      return <Image {...ImageProps} />
    }
    // 日期
    if (tpl === 'date') {
      if (value === emptyText) {
        return emptyText
      }
      const { format = 'YYYY-MM-DD' } = template
      return formatTime(value, format, emptyText)
    }
    // 链接
    if (tpl === 'link') {
      const { render } = template
      const list = flatten([render(value, record, index)]).map((v, i) => {
        const { icon, tooltip } = v
        let iconName = ''
        if (isString(icon)) {
          iconName = icon
        }
        if (isObject(icon)) {
          iconName = get(icon, 'type.render.displayName')
        }
        const key = [i, v.text, iconName, tooltip].join()
        return merge(
          {},
          {
            key,
            visible: true,
            query: {},
            tooltip: '',
            isMore: false
          },
          v
        )
      })

      const dropdownList = filter(list, { isMore: true })

      const items = dropdownList.map(v => {
        return {
          key: v.key,
          label: renderButton(v, context)
        }
      })

      return [
        ...filter(list, { isMore: false }).map(v => {
          return renderButton(v, context)
        }),
        !isEmptyArray(dropdownList) && (
          <Dropdown
            key="Dropdown"
            overlayClassName={getClassNames('render-link-dropdown')}
            menu={{ items }}
            placement="bottomRight"
            arrow
          >
            <Button icon={<EllipsisOutlined.default />} type="link" size="small" />
          </Dropdown>
        )
      ]
    }
    // 数字 - 千分位
    if (tpl === 'digit') {
      if (value === emptyText) {
        return emptyText
      }
      const { prefix, suffix } = template
      return [prefix, thousands(value), suffix].join(' ')
    }
    // 百分比
    if (tpl === 'percent') {
      if (value === emptyText) {
        return emptyText
      }
      const { precision = 2, times = 2, suffix = '%' } = template
      const temp = Number(multiply(value, 10 ** times).toFixed(precision))
      return [temp, suffix].join('')
    }
    // 评分
    if (tpl === 'rate') {
      if (value === emptyText) {
        return emptyText
      }
      const props = omit(template, ['tpl', 'emptyText'])
      return <Rate value={value} disabled {...props} />
    }
    // 进度条
    if (tpl === 'progress') {
      if (value === emptyText) {
        return emptyText
      }
      const props = omit(template, ['tpl', 'emptyText'])
      return <Progress percent={value} {...props} />
    }
    // 代码
    if (tpl === 'code') {
      if (value === emptyText) {
        return emptyText
      }
      const { language } = template
      if (language === 'json') {
        return (
          <pre className={getClassNames('render-code')}>
            <code>{JSON.stringify(value, '', 2)}</code>
          </pre>
        )
      }
      return (
        <pre className={getClassNames('render-code')}>
          <code>{value}</code>
        </pre>
      )
    }
    // 代码
    if (tpl === 'avatar') {
      const groupProps = ['maxCount', 'maxPopoverPlacement', 'maxPopoverTrigger', 'maxStyle']
      const props = omit(template, ['tpl', 'emptyText'])
      if (value === emptyText || isEmptyArray(value)) {
        return <Avatar icon={<UserOutlined.default />} {...omit(props, groupProps)} />
      }
      if (Array.isArray(value)) {
        return (
          <Avatar.Group {...props}>
            {value.map((v, i) => {
              return <Avatar src={v} {...omit(props, groupProps)} key={i} />
            })}
          </Avatar.Group>
        )
      }
      return <Avatar src={value} {...props} />
    }
    // 表单
    if (Object.keys(BuiltInComponents).includes(tpl)) {
      const BuiltInComponent = BuiltInComponents[tpl]
      const props = omit(template, ['tpl', 'emptyText'])
      return <BuiltInComponent value={value} {...props} />
    }
    return null
  }
}
