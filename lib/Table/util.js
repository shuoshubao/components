import React from 'react'
import { isFragment, isElement } from 'react-is'
import { Radio, Checkbox, TreeSelect, Button, Tooltip } from 'antd'
import { get, set, cloneDeep, isEqual, isUndefined, isFunction, isObject, merge, filter, flatten } from 'lodash'
import { classNames, isEmptyValue, isEmptyArray, isEveryFalsy, formatTime } from '@nbfe/tools'
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined'
import FilterFilled from '@ant-design/icons/FilterFilled'
import { componentName, getClassNames, getTooltipTitleNode } from './config'
import BuiltInComponents from '../Form/components'
import getRender from './Render'

const RenderTplList = [
  ...Object.keys(BuiltInComponents),
  'sort',
  'numbering',
  'text',
  'enum',
  'image',
  'date',
  'link',
  'code',
  'digit',
  'percent',
  'rate',
  'progress'
]

export const defaultExtraConfig = {
  storageKey: '', // 存储的key
  showTotal: false, // 是否在表头展示总数据 false / true / (totalNum) => ReactNode
  showFullScreen: false, // 展示按钮: 全屏
  showColumnsSetting: false, // 展示按钮: 表头设置
  showViewMode: false, // 展示按钮: 切换视图
  disabledSort: null // 禁止拖拽排序
}

export const getStorageKey = (storageType, storageKey) => {
  const { pathname, hash } = window.location
  const hashEndIndex = hash.includes('?') ? hash.indexOf('?') : Infinity
  const hashPath = hash.slice(1, hashEndIndex).split('#')[0]
  return [componentName, storageType, pathname, hashPath, storageKey].filter(Boolean).join('_')
}

export const getInitialViewMode = props => {
  const { storageKey, showViewMode } = { ...defaultExtraConfig, ...props.extraConfig }
  if (!showViewMode) {
    return 'table'
  }
  const viewModeStorageKey = getStorageKey('ViewMode', storageKey)
  const value = window.localStorage.getItem(viewModeStorageKey)
  return value === 'list' ? 'list' : 'table'
}

// 总条数
export const renderTotalNum = totalNum => {
  return (
    <>
      总计<span className={getClassNames('total')}>{totalNum}</span>条数据
    </>
  )
}

// 表格头部的总数据展示
export const getRenderTotalNum = (totalNum, showTotal) => {
  if (!showTotal) {
    return null
  }
  if (isFunction(showTotal)) {
    return showTotal(totalNum)
  }
  return renderTotalNum(totalNum)
}

const defaultColumn = {
  dataIndex: '',
  visible: true, // 显示|隐藏
  filters: [], // 筛选项 {label, value}[]
  filterMultiple: true, // 单选|多选
  editable: false, // 是否可编辑
  rules: [], // 交易规则 编辑态
  tooltip: '', // 表头提示文案
  transform: null, // 数据转换器
  template: {
    tpl: 'text',
    emptyText: '--'
  }
}

// 处理 props.columns
export const mergeColumns = (columns, context) => {
  const { onFilterChange, onFilterReset, changeTreeSelect, onFilterConfirm, handleEditRow } = context
  const innerColumns = cloneDeep(columns)
    .map(v => {
      const column = merge({}, defaultColumn, v)
      const { dataIndex, filters, filterMultiple, transform, render, template } = column
      // 远端排序
      if (isEmptyArray(filters)) {
        delete column.filters
      } else {
        column.filterIcon = () => {
          const value = context.state.filterParams[dataIndex]
          const filtered = isEveryFalsy(isEmptyValue(value), isEmptyArray(value))
          return <FilterFilled.default style={{ color: filtered ? '#1890ff' : undefined }} />
        }
        column.filterDropdown = props => {
          // 选中的值
          const value = context.state.filterParams[dataIndex]
          const { confirm } = props
          let dropdownNode
          const isTreeSelect = flatten(
            filters.map(v2 => {
              return Object.keys(v2)
            })
          ).includes('children')
          if (isTreeSelect) {
            dropdownNode = (
              <TreeSelect
                value={value}
                treeData={filters}
                onChange={val => {
                  onFilterChange(dataIndex, val)
                }}
                style={{ width: 200 }}
                dropdownMatchSelectWidth={200}
                showSearch
                treeNodeFilterProp="label"
                treeNodeLabelProp="label"
                maxTagCount={1}
                dropdownStyle={{ maxHeight: 400, overflowY: 'auto' }}
                treeDefaultExpandAll
                multiple={filterMultiple}
                treeCheckable={filterMultiple}
                open={context.state.treeSelectOpens[dataIndex] || false}
              />
            )
          } else {
            // 多选 / 单选
            if (filterMultiple) {
              dropdownNode = (
                <Checkbox.Group
                  value={value}
                  options={filters}
                  onChange={val => {
                    onFilterChange(dataIndex, val)
                  }}
                />
              )
            } else {
              dropdownNode = (
                <Radio.Group
                  value={value}
                  options={filters}
                  onChange={e => {
                    onFilterChange(dataIndex, e.target.value)
                  }}
                />
              )
            }
          }
          let disabledReset
          if (filterMultiple) {
            disabledReset = isUndefined(value) || isEqual(value, [])
          } else {
            disabledReset = isUndefined(value) || isEqual(value, '')
          }
          return (
            <div
              className={classNames(getClassNames('filter-dropdown'), {
                [getClassNames('filter-dropdown-has-tree-select')]: isTreeSelect
              })}
            >
              <div className={getClassNames('filter-dropdown-options')}>{dropdownNode}</div>
              <div
                className={classNames(getClassNames('filter-dropdown-footer'), {
                  [getClassNames('filter-dropdown-footer-hide')]: isTreeSelect
                })}
              >
                <Button
                  size="small"
                  type="text"
                  disabled={disabledReset}
                  onClick={() => {
                    onFilterReset(dataIndex, filterMultiple)
                    confirm({ closeDropdown: true })
                  }}
                >
                  重置
                </Button>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    onFilterConfirm()
                    confirm({ closeDropdown: true })
                  }}
                >
                  确定
                </Button>
              </div>
            </div>
          )
        }
        column.onFilterDropdownVisibleChange = visible => {
          changeTreeSelect(visible, dataIndex)
          if (visible) {
            context.prevFilterValue = cloneDeep(context.state.filterParams)
          } else {
            if (isEqual(context.prevFilterValue, context.state.filterParams)) {
              return
            }
            onFilterConfirm()
          }
        }
      }

      // 注入 transform
      if (isFunction(render)) {
        if (isFunction(transform)) {
          column.render = (text, record, index) => {
            const value = get(record, dataIndex)
            return render(transform(value, record, index), record, index)
          }
        } else {
          column.render = (text, record, index) => {
            const value = get(record, dataIndex)
            return render(value, record, index)
          }
        }
      } else {
        const { tpl } = template
        if (RenderTplList.includes(tpl)) {
          // 行号 默认宽度
          if (tpl === 'numbering') {
            column.width = column.width || 55
          }
          // 图片 默认宽度;默认值
          if (tpl === 'image') {
            column.width = column.width || 70
            column.template.emptyText = ''
          }
          column.render = getRender({ dataIndex, transform, template }, context)
        }
      }

      return column
    })
    .map(v => {
      const { editable, dataIndex, rules } = v
      if (!editable) {
        return v
      }
      return {
        ...v,
        onCell: (record, index) => {
          return {
            index,
            record,
            editable,
            dataIndex,
            rules,
            handleEditRow
          }
        }
      }
    })
  return filter(innerColumns, { visible: true })
}

export const getTitleNode = ({ title, tooltip }, getPopupContainer) => {
  if (!(tooltip || '').length) {
    return title
  }
  return (
    <>
      {title}
      <Tooltip title={getTooltipTitleNode(tooltip)} getPopupContainer={getPopupContainer}>
        <QuestionCircleOutlined.default className={getClassNames('column-title-tooltip')} />
      </Tooltip>
    </>
  )
}

// 显示|隐藏
export const getRenderColumns = (columns, columnsTitleList, getPopupContainer) => {
  return columns
    .filter((v, i) => {
      // 不允许全都隐藏
      if (isEmptyArray(columnsTitleList)) {
        return i === 0
      }
      return columnsTitleList.includes(v.title)
    })
    .map(v => {
      return {
        ...v,
        title: getTitleNode(v, getPopupContainer)
      }
    })
}

const injectPropsNode = (node, props = {}) => {
  if (!isElement(node)) {
    return node
  }
  return {
    ...node,
    props: {
      ...props,
      ...node.props
    }
  }
}

export const injectPropsReactElement = (ReactNode, props = {}) => {
  if (!isObject(ReactNode)) {
    return ReactNode
  }
  if (isFragment(ReactNode)) {
    const { children } = ReactNode.props
    return flatten([children]).map(v => {
      return injectPropsNode(v, props)
    })
  }
  if (isElement(ReactNode)) {
    return injectPropsNode(ReactNode, props)
  }
  if (Array.isArray(ReactNode)) {
    return ReactNode.map(v => {
      return injectPropsNode(v, props)
    })
  }
  return ReactNode
}

// 编辑 数据处理
export const formatDataSource = ({ dataSource, index, dataIndex, value, column }) => {
  const data = cloneDeep(dataSource)
  const { template } = column
  const { tpl } = template

  if (tpl === 'date-picker') {
    const { format = 'YYYY-MM-DD' } = template
    set(data[index], dataIndex, formatTime(value, format, ''))
    return data
  }

  if (tpl === 'date-range-picker') {
    const [key1, key2] = dataIndex.split(',')
    const { format = 'YYYY-MM-DD' } = template
    const [value1, value2] = (value || ['', '']).map(v => {
      return formatTime(v, format, null)
    })
    set(data[index], key1, value1)
    set(data[index], key2, value2)
    return data
  }

  if (tpl === 'time-picker') {
    const { format = 'HH:mm:ss' } = template
    set(data[index], dataIndex, formatTime(value, format, ''))
    return data
  }

  if (tpl === 'time-range-picker') {
    const [key1, key2] = dataIndex.split(',')
    const { format = 'HH:mm:ss' } = template
    const [value1, value2] = (value || ['', '']).map(v => {
      return formatTime(v, format, null)
    })
    set(data[index], key1, value1)
    set(data[index], key2, value2)
    return data
  }

  if (tpl === 'number-range') {
    const [key1, key2] = dataIndex.split(',')
    const [value1, value2] = value || [null, null]
    set(data[index], key1, value1)
    set(data[index], key2, value2)
    return data
  }

  set(data[index], dataIndex, value)
  return data
}

export const getRowKeyData = (rowKey = 'key', record = {}) => {
  return isFunction(rowKey) ? rowKey(record) : record[rowKey]
}
