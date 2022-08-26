import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Badge, Tag } from 'antd'
import { find, flatten, sortBy, cloneDeep, remove } from 'lodash'
import { isEveryFalsy, isEmptyArray, isEmptyValue, getLabelByValue, formatTime } from '@nbfe/tools'
import { isAntdV3 } from './config'
import { getClassNames, getDisplayName } from './util'

class Index extends Component {
  static displayName = getDisplayName('FilterPanel')

  static defaultProps = {}

  static propTypes = {
    columns: PropTypes.array.isRequired,
    getFieldsValue: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {}

  // 给外部调用
  setFields = () => {
    const { props } = this
    const { columns, getFieldsValue } = props
    const formData = getFieldsValue()
    const data = []
    sortBy(Object.entries(formData), ([k]) => {
      return columns.findIndex(v2 => {
        return v2.name === k
      })
    })
      .filter(([, v]) => {
        return isEveryFalsy(isEmptyValue(v), isEmptyArray(v))
      })
      .forEach(([key, value]) => {
        const column = find(columns, { name: key })
        const { name, label, template } = column
        const { tpl, options } = template
        if (!['select', 'radio', 'checkbox', 'date-picker', 'date-range-picker'].includes(tpl)) {
          return
        }
        // 日期
        if (['date-picker', 'date-range-picker'].includes(tpl)) {
          const { format } = template
          let valueText = formatTime(value, format)
          if (['date-range-picker'].includes(tpl)) {
            valueText = [formatTime(value[0], format), formatTime(value[1], format)].join(' - ')
          }
          data.push({
            name,
            value,
            label,
            valueText
          })
          return
        }
        // 枚举类
        if (['select', 'radio', 'checkbox'].includes(tpl)) {
          sortBy(flatten([value]), v => {
            return options.findIndex(v2 => {
              return v2.value === v
            })
          }).forEach(item => {
            const valueText = getLabelByValue(item, options)
            data.push({
              name,
              value: item,
              label,
              valueText
            })
          })
        }
      })
    this.setState({ data })
  }

  // 移除
  onRemove = (item, i) => {
    const { props } = this
    const { onChange, columns, getFieldsValue } = props
    const formData = getFieldsValue()
    const { name, value } = item
    const column = find(columns, { name })
    const { template } = column
    const { tpl } = template
    this.setState(prevState => {
      const oldData = cloneDeep(prevState.data)
      oldData.splice(i, 1)
      return {
        data: oldData
      }
    })
    let newValue = cloneDeep(formData[name])
    if (Array.isArray(newValue)) {
      if (tpl === 'date-range-picker') {
        newValue = ''
      } else {
        remove(newValue, v => {
          return v === value
        })
      }
    } else if (tpl === 'select') {
      newValue = undefined
    } else {
      newValue = ''
    }
    if (isAntdV3) {
      onChange({
        [name]: {
          value: newValue
        }
      })
    } else {
      onChange([
        {
          name,
          value: newValue
        }
      ])
    }
  }

  render() {
    const { state, onRemove } = this
    const { data } = state
    if (isEmptyArray(data)) {
      return null
    }
    return (
      <div className={getClassNames('filter-panel')}>
        <Divider orientation="left">
          <span>已选</span>
          <Badge count={data.length} offset={[5, -3]} size="small" />
        </Divider>
        <div className={getClassNames('filter-panel-tags')}>
          {data.map((v, i) => {
            const { label, value, valueText } = v
            const tagText = `${label}(${valueText})`
            return (
              <Tag
                color="blue"
                closable
                key={[i, value].join()}
                onClose={() => {
                  onRemove(v, i)
                }}
              >
                {tagText}
              </Tag>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Index
