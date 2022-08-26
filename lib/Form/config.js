import { version } from 'antd'
import { kebabCase, inRange } from 'lodash'

export const isAntdV3 = inRange(parseInt(version, 10), 3, 4)

export const isAntdV4 = inRange(parseInt(version, 10), 4, 5)

export const componentName = 'DynamicForm'

export const prefixClassName = kebabCase(componentName)

export const defaultExtraConfig = {
  submitText: '查询',
  resetText: '重置',
  submitLabelWidth: null
}

export const defaulCardProps = {
  size: 'small',
  bordered: false
}

export const defaulFormProps = {
  layout: 'inline'
}

// Form.Item tooltip 与文字的边距
export const formItemTooltopMargin = 4

// 默认 column
export const defaultColumn = {
  key: '',
  label: '',
  name: '', // 当 tpl = 'date-range-picker' 时, 传复合key, 例如: 'startTime,endTime'
  rules: [],
  visible: true,
  defaultValue: '',
  immediate: true,
  tooltip: '',
  placeholder: '',
  inline: true,
  style: {},
  formItemStyle: {},
  transform: null, // 数据转换器
  formListConfig: null, // Form.List
  template: {
    tpl: 'input',
    width: 200
  }
}

export const pickerFormatMap = {
  date: 'YYYY-MM-DD',
  year: 'YYYY',
  month: 'YYYY-MM',
  week: 'YYYY-wo',
  quarter: 'quarter' // todo: Q1,Q2,Q3,Q4
}

// Input select + input 拼接的分隔符
// 日期范围 开始时间 + 结束时间 拼接的分隔符
export const searchSeparator = '___'

// Input 的 inputType 属性
export const inputTypeList = ['input', 'search', 'select-search', 'select-input', 'textarea', 'password']
