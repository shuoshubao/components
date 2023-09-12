import { TreeSelect } from 'antd'
import { cloneDeep, find, isObject, noop, omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
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

class Index extends React.Component {
  static displayName = getDisplayName('TreeSelect')

  static defaultProps = {}

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    remoteConfig: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      treeData: cloneDeep(props.treeData)
    }
  }

  async componentDidMount() {
    const { props } = this
    const { remoteConfig } = props
    if (!isObject(remoteConfig)) {
      return
    }
    const { process: processFunc = noop } = remoteConfig
    const responseData = await getCacheFetch(remoteConfig)
    const treeData = processFunc(responseData) || responseData
    this.setState({ treeData })
  }

  render() {
    const { props, state } = this
    const { value, onChange } = props
    const { treeData } = state
    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'treeData', 'remoteConfig'])
    return (
      <TreeSelect
        {...componentProps}
        value={value}
        treeData={treeData}
        onChange={val => {
          onChange(val)
          if (props.onCustomChange) {
            props.onCustomChange()
          }
        }}
      />
    )
  }
}

export default Index
