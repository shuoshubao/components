import React from 'react'
import { Button, Typography, Tag, Tooltip, Popconfirm, Modal, Menu, Dropdown, Rate, Progress, Image } from 'antd'
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
  mul
} from '@nbfe/tools'
import MenuOutlined from '@ant-design/icons/MenuOutlined'
import EllipsisOutlined from '@ant-design/icons/EllipsisOutlined'
import { getClassNames, getTooltipTitleNode, ImageFallback } from './config'
import BuiltInComponents from '../Form/components'

const { Paragraph } = Typography

const getValue = (dataIndex, emptyText, record) => {
  const value = get(record, dataIndex)
  return isEmptyValue(value) ? emptyText : value
}

const renderButtonList = (list, context) => {
  return list.map(v => {
    const { text, key, visible, query, tooltip, PopconfirmConfig, ModalConfirmConfig } = v
    const props = omit(v, [
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
  })
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
    // 行号
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
      return <Paragraph {...props}>{value}</Paragraph>
    }
    // 枚举
    if (tpl === 'enum') {
      const { options = [], shape = 'text' } = template
      const valueText = getLabelByValue(value, options, emptyText)
      if (valueText === emptyText) {
        return valueText
      }
      const itemProps = omit(find(options, { value }), ['value', 'label'])
      if (shape === 'tag') {
        return (
          <Tag className={getClassNames('render-tag')} {...itemProps}>
            {valueText}
          </Tag>
        )
      }
      if (shape === 'circle') {
        const { color = 'rgba(0, 0, 0, 0.65)' } = itemProps
        const style = { color, border: `1px solid ${color}` }
        return (
          <span style={style} className={getClassNames(['render-enum', shape].join('-'))}>
            {valueText}
          </span>
        )
      }
      if (['dot', 'square'].includes(shape)) {
        const { color = 'rgba(0, 0, 0, 0.85)' } = itemProps
        return (
          <span className={getClassNames(['render-enum', shape].join('-'))}>
            <span className={getClassNames('render-enum-badge')} style={{ backgroundColor: color }} />
            <span className={getClassNames('render-enum-text')} style={{ color }}>
              {valueText}
            </span>
          </span>
        )
      }
      return valueText
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
        fallback: ImageFallback,
        ...props
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

      const menu = (
        <Menu>
          {dropdownList.map(v => {
            return <Menu.Item key={v.key}>{renderButtonList([v], context)}</Menu.Item>
          })}
        </Menu>
      )

      return [
        ...renderButtonList(filter(list, { isMore: false }), context),
        !isEmptyArray(dropdownList) && (
          <Dropdown
            key="Dropdown"
            overlayClassName={getClassNames('render-link-dropdown')}
            overlay={menu}
            placement="bottomRight"
            arrow
          >
            <Button icon={<EllipsisOutlined.default />} type="link" size="small" />
          </Dropdown>
        )
      ]
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
      const temp = Number(mul(value, 10 ** times).toFixed(precision))
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
    // 表单
    if (Object.keys(BuiltInComponents).includes(tpl)) {
      const BuiltInComponent = BuiltInComponents[tpl]
      const props = omit(template, ['tpl', 'emptyText'])
      return <BuiltInComponent value={value} {...props} />
    }
    return null
  }
}
