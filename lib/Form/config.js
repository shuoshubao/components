import { kebabCase } from 'lodash'

export const componentName = 'DynamicForm'

export const prefixClassName = kebabCase(componentName)

export const defaultExtraConfig = {
  submitText: '查询',
  resetText: '重置',
  submitLabelWidth: null
}

// 默认 column
export const defaultColumn = {
  key: '',
  label: '',
  name: '', // 当 tpl = 'date-range-picker' 时, 传复合key, 例如: 'startTime,endTime'
  rules: [],
  visible: true,
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

// Input 的 inputType 属性
export const inputTypeList = ['input', 'search', 'select-search', 'select-input', 'textarea', 'password']
