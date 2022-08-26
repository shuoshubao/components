import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'antd'
import { find, map, omit, pick, isObject, cloneDeep, noop } from 'lodash'
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
  static displayName = getDisplayName('Checkbox')

  static defaultProps = {
    // 是否展示全部
    indeterminate: false,
    defaultSelectAll: false // 默认选择全部
  }

  static propTypes = {
    indeterminate: PropTypes.bool,
    defaultSelectAll: PropTypes.bool,
    value: PropTypes.any,
    onChange: PropTypes.func,
    remoteConfig: PropTypes.object
  }

  constructor(props) {
    super(props)
    const options = cloneDeep(props.options)
    this.state = {
      options,
      indeterminate: false,
      checkAll: false
    }
  }

  async componentDidMount() {
    const { props } = this
    const { defaultSelectAll, remoteConfig } = props
    if (!isObject(remoteConfig)) {
      this.setCheckAll()
      return
    }
    const { process: processFunc = noop } = remoteConfig
    const responseData = await getCacheFetch(remoteConfig)
    const options = convertDataToEnum(
      processFunc(responseData) || responseData,
      pick(remoteConfig, ['path', 'valueKey', 'labelKey'])
    )
    if (defaultSelectAll) {
      this.setState({ options, checkAll: true }, () => {
        const checkedList = map(options, 'value')
        this.props.onChange(checkedList)
      })
    } else {
      this.setState({ options }, () => {
        this.setCheckAll()
      })
    }
  }

  onCheckAllChange = e => {
    const options = cloneDeep(this.state.options)
    const { checked } = e.target
    const checkedList = checked ? map(options, 'value') : []
    this.setState({ checkAll: checked, indeterminate: false })
    this.props.onChange(checkedList)
  }

  // 全选按钮的状态
  setCheckAll = () => {
    const { value } = this.props
    const { options } = this.state
    this.setState({
      indeterminate: value.length && options.length !== value.length,
      checkAll: options.length === value.length
    })
  }

  render() {
    const { props, state } = this
    const { value, onChange } = props
    const { options, indeterminate, checkAll } = state
    const componentProps = omit(props, [
      'defaultValue',
      'value',
      'onChange',
      'options',
      'onCustomChange',
      'remoteConfig',
      'indeterminate',
      'defaultSelectAll'
    ])
    return (
      <Fragment>
        {!!props.indeterminate && !isEmptyArray(options) && (
          <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
            全选
          </Checkbox>
        )}
        <Checkbox.Group
          {...componentProps}
          options={options}
          value={value}
          onChange={val => {
            onChange(val)
            this.setState({
              indeterminate: val.length && options.length !== val.length,
              checkAll: options.length === val.length
            })
            if (props.onCustomChange) {
              props.onCustomChange()
            }
          }}
        />
      </Fragment>
    )
  }
}

export default Index
