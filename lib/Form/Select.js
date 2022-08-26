import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Select, Checkbox, Divider } from 'antd'
import { omit, pick, isObject, cloneDeep, noop, debounce, isEqual, map, find } from 'lodash'
import { convertDataToEnum, isEmptyArray } from '@nbfe/tools'
import { getDisplayName } from './util'

const CacheFetch = []

const getCacheFetch = remoteConfig => {
  const item = find(CacheFetch, { remoteConfig })
  if (item) {
    return item.request
  }
  const requestInstance = remoteConfig.fetch()
  CacheFetch.push({
    remoteConfig,
    request: requestInstance
  })
  return requestInstance
}

class Index extends Component {
  static displayName = getDisplayName('Select')

  static defaultProps = {
    options: []
  }

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    allItem: PropTypes.object,
    options: PropTypes.array,
    remoteConfig: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      options: cloneDeep(props.options),
      // 多选 + 全选
      isMultipleAllSelect: ['multiple', 'tags'].includes(props.mode) && props.allItem,
      checkAll: false,
      indeterminate: false // 多选模式的全选按钮的 indeterminate 状态
    }
  }

  async componentDidMount() {
    const { props } = this
    const { value, remoteConfig, showSearch, isMultipleAllSelect } = props
    if (!isObject(remoteConfig)) {
      if (isMultipleAllSelect) {
        const { options } = props
        const indeterminate = !isEqual(map(options, 'value').sort(), value.sort())
        this.setState({
          indeterminate,
          checkAll: !indeterminate
        })
      }
      return
    }
    if (showSearch) {
      return
    }
    const { process: processFunc = noop } = remoteConfig
    const responseData = await getCacheFetch(remoteConfig)
    const options = convertDataToEnum(
      processFunc(responseData) || responseData,
      pick(remoteConfig, ['path', 'valueKey', 'labelKey'])
    )
    this.setState({ options })
    if (isMultipleAllSelect) {
      const indeterminate = !isEqual(map(options, 'value').sort(), value.sort())
      this.setState({
        indeterminate,
        checkAll: !indeterminate
      })
    }
  }

  handleSearch = async searchText => {
    const { remoteConfig } = this.props
    const value = searchText.trim().replace(/'/g, '')
    if (!value) {
      this.setState({ options: [] })
      return
    }
    const { fetch: fetchFunc, process: processFunc = noop } = remoteConfig
    const responseData = await fetchFunc(value)
    const options = convertDataToEnum(
      processFunc(responseData) || responseData,
      pick(remoteConfig, ['path', 'valueKey', 'labelKey'])
    )
    this.setState({ options })
  }

  handleChange = value => {
    const { options, isMultipleAllSelect } = this.state
    if (isMultipleAllSelect) {
      const indeterminate = !isEqual(map(options, 'value').sort(), value.sort())
      this.setState({
        indeterminate: !isEmptyArray(value) && indeterminate,
        checkAll: !indeterminate
      })
    }
  }

  onCheckAllChange = e => {
    const { props, state } = this
    const { onChange } = props
    const { options } = state
    const { checked } = e.target
    this.setState({
      checkAll: checked,
      indeterminate: false
    })
    onChange(checked ? map(options, 'value') : [])
  }

  render() {
    const { props, state } = this
    const { value, onChange, allItem, showSearch } = props
    const { options, checkAll, isMultipleAllSelect, indeterminate } = state
    const componentProps = omit(props, [
      'defaultValue',
      'value',
      'onChange',
      'onCustomChange',
      'options',
      'allItem',
      'remoteConfig'
    ])
    if (showSearch) {
      componentProps.onSearch = debounce(this.handleSearch, 200)
    }
    // 复选 - 全选
    if (isMultipleAllSelect && options.length) {
      componentProps.dropdownRender = menu => {
        return (
          <Fragment>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ padding: '4px 12px' }}>
              <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={this.onCheckAllChange}>
                {allItem.label}
              </Checkbox>
            </div>
          </Fragment>
        )
      }
    }
    return (
      <Select
        {...componentProps}
        value={value}
        onChange={val => {
          onChange(val)
          this.handleChange(val)
          if (props.onCustomChange) {
            props.onCustomChange(val, options)
          }
        }}
      >
        {[isMultipleAllSelect ? null : allItem, ...options].filter(Boolean).map(v => {
          const optionProps = pick(v, ['className', 'disabled', 'title', 'value'])
          return (
            <Select.Option key={v.value} {...optionProps}>
              {v.label}
            </Select.Option>
          )
        })}
      </Select>
    )
  }
}

export default Index
