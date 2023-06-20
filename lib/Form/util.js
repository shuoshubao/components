import React from 'react'
import { Typography, Tooltip } from 'antd'
import { get, find, omit, merge, cloneDeep, isFunction } from 'lodash'
import moment from 'moment'
import { classNames, isSomeFalsy, formatTime, isEmptyValue, isEmptyArray, getTooltipHtml } from '@nbfe/tools'
import { componentName, prefixClassName, defaultColumn, pickerFormatMap, formItemTooltopMargin, searchSeparator, inputTypeList } from './config'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Text } = Typography

export const getDisplayName = (name = '') => {
  return [componentName, name].join('')
}

export const getClassNames = (...args) => {
  return classNames(args)
    .split(' ')
    .map(v => {
      return [prefixClassName, v].filter(Boolean).join('-')
    })
    .join(' ')
}

// 处理 props.columns
export const mergeColumns = (columns = [], initialValues = {}) => {
  return cloneDeep(columns).map(v => {
    const column = merge({}, defaultColumn, v)
    const { name, label } = column
    const initialValue = column.initialValue ?? initialValues[name]
    let { template } = column
    const { tpl } = template
    column.rules = column.rules.map(v2 => {
      if (isFunction(v2)) {
        return v2(label)
      }
      return v2
    })
    if (tpl === 'input') {
      template = {
        inputType: 'input',
        ...template
      }
      const { inputType } = template
      if (!column.placeholder) {
        column.placeholder = label ? ['请输入', label].join('') : ''
      }
      if (['select-search', 'select-input'].includes(inputType)) {
        template = {
          inputWidth: defaultColumn.template.width,
          selectWidth: 100,
          options: [],
          ...template
        }
        const [selectKey, inputKey] = name.split(',')
        column.name = [selectKey, inputKey].join(searchSeparator)
      }
    }
    if (tpl === 'auto-complete') {
      if (!column.placeholder) {
        column.placeholder = label ? ['请输入', label].join('') : ''
      }
    }
    if (['select', 'cascader', 'tree-select'].includes(tpl)) {
      if (!column.placeholder) {
        column.placeholder = label ? ['请选择', label].join('') : ''
      }
    }
    if (tpl === 'select') {
      column.template.options = column.template.options || []
    }
    if (tpl === 'tabs') {
      column.template.items = column.template.items || []
    }
    if (tpl === 'cascader') {
      column.initialValue = Array.isArray(initialValue) ? initialValue : []
    }
    if (tpl === 'tree-select') {
      column.template.treeData = column.template.treeData || []
    }
    if (tpl === 'checkbox') {
      column.initialValue = Array.isArray(initialValue) ? initialValue : []
      column.template.options = column.template.options || []
    }
    if (tpl === 'date-picker') {
      // picker: date | week | month | quarter | year
      template = {
        picker: 'date',
        ...template
      }
      template = {
        format: pickerFormatMap[template.picker],
        ...template
      }
      if (initialValue) {
        column.initialValue = moment(initialValue, template.format)
      } else {
        column.initialValue = null
      }
      column.placeholder = undefined
    }
    if (tpl === 'date-range-picker') {
      template = {
        format: 'YYYY-MM-DD HH:mm:ss',
        ...template
      }
      column.placeholder = undefined
    }
    if (tpl === 'time-picker') {
      template = {
        format: 'HH:mm:ss',
        ...template
      }
      if (initialValue) {
        column.initialValue = moment(initialValue, template.format)
      } else {
        column.initialValue = null
      }
    }

    if (tpl === 'time-range-picker') {
      template = {
        format: 'HH:mm:ss',
        ...template
      }
      column.placeholder = undefined
    }

    if (tpl === 'number-range') {
      column.placeholder = column.placeholder || '最小值,最大值'
    }
    // 日期范围, 时间范围, 数字范围
    if (['date-range-picker', 'time-range-picker', 'number-range'].includes(tpl)) {
      const [key1, key2] = name.split(',')
      column.name = [key1, key2].join(searchSeparator)
      if (!initialValue) {
        if (['date-range-picker', 'time-range-picker'].includes(tpl)) {
          column.initialValue = moment(initialValue, template.format)
          if (key1 in initialValues && key2 in initialValues) {
            column.initialValue = [moment(initialValues[key1], template.format), moment(initialValues[key2], template.format)]
          } else {
            column.initialValue = []
          }
        }
        if (['number-range'].includes(tpl)) {
          if (key1 in initialValues && key2 in initialValues) {
            column.initialValue = [initialValues[key1], initialValues[key2]]
          } else {
            column.initialValue = []
          }
        }
      }
    }
    column.template = template
    return column
  })
}

// 校验参数
export const validateColumns = (columns = []) => {
  columns.forEach(column => {
    const { name, template } = column
    const { tpl } = template
    if (tpl === 'input') {
      const { inputType = 'input' } = template
      if (!inputTypeList.includes(inputType)) {
        throw new Error(`[${componentName}] inputType 参数非法, 需为其中一种: ${inputTypeList.join('|')}`)
      }
      if (['select-search', 'select-input'].includes(inputType)) {
        const [selectKey, inputKey] = name.split(searchSeparator)
        if (isSomeFalsy(selectKey, inputKey)) {
          throw new Error(`[${componentName}] ${tpl} 必须传参数: "name" 形式为 "selectKey,inputKey"`)
        }
      }
    }
    if (tpl === 'auto-complete') {
      const fetchFunc = get(template, 'remoteConfig.fetch')
      if (!isFunction(fetchFunc)) {
        throw new Error(`[${componentName}] auto-complete 必须传参数: "template.remoteConfig.fetch" 需为函数`)
      }
    }
    // 日期范围, 时间范围, 数字范围
    if (['date-range-picker', 'time-range-picker', 'number-range'].includes(tpl)) {
      const [key1, key2] = name.split(searchSeparator)
      if (isSomeFalsy(key1, key2)) {
        throw new Error(`[${componentName}] ${tpl} 必须传参数: "name" 形式为 "key1,key2"`)
      }
    }
  })
}

// 表单初始值
export const getInitialValues = (columns = [], initialValues = {}) => {
  return cloneDeep(columns).reduce((prev, cur) => {
    const { name, template } = cur
    const initialValue = cur.initialValue ?? initialValues?.[name]
    const { tpl } = template
    // 日期范围, 时间范围, 数字范围
    if (['date-range-picker', 'time-range-picker', 'number-range'].includes(tpl)) {
      const [key1, key2] = name.split(searchSeparator)
      prev[key1] = (initialValue || [])[0] ?? null
      prev[key2] = (initialValue || [])[1] ?? null
    }
    prev[name] = initialValue
    return prev
  }, {})
}

// 处理提交的值
export const getSearchValues = (params, columns) => {
  const result = {}
  columns
    .filter(v => Boolean(v.visible))
    .forEach(v => {
      const { name, template } = v
      const { tpl } = template
      const value = params[name]
      if (tpl === 'input') {
        const { inputType } = template
        if (['select-search', 'select-input'].includes(inputType)) {
          const [selectKey, inputKey] = name.split(searchSeparator)
          result[selectKey] = value[0]
          result[inputKey] = value[1]
          return
        }
      }
      if (tpl === 'date-picker') {
        const { format } = template
        if (value) {
          result[name] = formatTime(value, format)
        } else {
          result[name] = null
        }
        return
      }
      if (tpl === 'date-range-picker') {
        const { format } = template
        const [key1, key2] = name.split(searchSeparator)
        if (value) {
          result[key1] = formatTime(value[0], format)
          result[key2] = formatTime(value[1], format)
        } else {
          result[key1] = null
          result[key2] = null
        }
        return
      }
      if (tpl === 'time-picker') {
        const { format } = template
        if (value) {
          result[name] = formatTime(value, format)
        } else {
          result[name] = null
        }
        return
      }
      if (tpl === 'time-range-picker') {
        const { format } = template
        const [key1, key2] = name.split(searchSeparator)
        if (value) {
          result[key1] = formatTime(value[0], format)
          result[key2] = formatTime(value[1], format)
        } else {
          result[key1] = null
          result[key2] = null
        }
        return
      }
      if (tpl === 'number-range') {
        const [key1, key2] = name.split(searchSeparator)
        const [value1, value2] = value || []
        result[key1] = isEmptyValue(value1) ? null : value1
        result[key2] = isEmptyValue(value2) ? null : value2
        return
      }
      result[name] = value
    })
  return Object.entries(result).reduce((prev, [k, v]) => {
    const column = find(columns, { name: k })
    if (column) {
      const { transform } = column
      if (isFunction(transform)) {
        prev[k] = transform(v)
      }
    }
    return prev
  }, result)
}

// icon 的宽度
const iconWidth = 14

// 获取 Form.Item label 的宽度
export const getFormItemLabelWidth = columns => {
  const labelWidthList = columns.map(v => {
    const { label, tooltip } = v
    let labelWidth = label.length * iconWidth
    if (tooltip.length) {
      labelWidth += iconWidth + formItemTooltopMargin
    }
    return labelWidth
  })
  // 是否有星号
  const hasRequired = columns.some(v => {
    return v.required || !isEmptyArray(v.rules)
  })
  return Math.max(...labelWidthList) + (hasRequired ? 12 : 0)
}

// 获取 Form.Item value 的宽度
export const getFormItemNodeStyle = column => {
  const { template } = column
  const { tpl, width } = template
  const style = {}
  // 单选 复选 日期范围
  if (['radio', 'checkbox', 'input-number', 'date-range-picker'].includes(tpl)) {
    style.width = undefined
  } else {
    style.width = width
  }
  return style
}

// 强制更新 Columns
export const forceUpdateColumns = ({ columns, fields = [], setFieldsValue }) => {
  columns.forEach(v => {
    if (fields.includes(v.name)) {
      v.key = Math.random()
    }
  })
  setFieldsValue(
    fields.reduce((prev, cur) => {
      const column = find(columns, { name: cur })
      prev[cur] = column.initialValue
      return prev
    }, {})
  )
  return columns
}

// Tooltip 支持链接的写法
export const getTooltipTitleNode = tooltip => {
  return getTooltipHtml(tooltip).map((v, i) => {
    return <div key={[i].join()} dangerouslySetInnerHTML={{ __html: v }} />
  })
}

// Form.Item tooltip
const renderFormItemLabel = (column, { labelWidth }) => {
  const { label, tooltip } = column
  if (!label) {
    return null
  }
  return (
    <div style={{ width: labelWidth || undefined }} className={getClassNames('form-item-label')}>
      <Text>{label}</Text>
      {!!tooltip && (
        <Tooltip title={getTooltipTitleNode(tooltip)} overlayClassName={getClassNames('tooltip')}>
          <QuestionCircleOutlined className={getClassNames('form-item-label-tooltip')} />
        </Tooltip>
      )}
    </div>
  )
}

// Form.Item 的 props
export const getFormItemProps = (column, { index, labelWidth }) => {
  const { label, name, inline } = column
  const formItemProps = omit(column, [
    'key',
    'label',
    'visible',
    'initialValue',
    'immediate',
    'tooltip',
    'placeholder',
    'inline',
    'formItemStyle',
    'transform',
    'formListConfig',
    'template'
  ])
  const labelNode = renderFormItemLabel(column, { labelWidth })
  const key = [index, label, name, column.key].join('_')
  return merge(
    {
      label: labelNode,
      key,
      style: { width: inline ? undefined : '100%' }
    },
    formItemProps
  )
}

// Form.Item 子组件的 props
export const getFormItemNodeProps = column => {
  const { placeholder, template } = cloneDeep(column)
  return {
    placeholder,
    style: getFormItemNodeStyle(column),
    ...omit(template, ['width', 'tpl'])
  }
}
