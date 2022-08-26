import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AutoComplete } from 'antd'
import { debounce, omit, pick, noop } from 'lodash'
import { convertDataToEnum } from '@nbfe/tools'
import { isAntdV3 } from './config'
import { getDisplayName } from './util'

class Index extends Component {
  static displayName = getDisplayName('AutoComplete')

  static defaultProps = {
    debounce: 200
  }

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    remoteConfig: PropTypes.object.isRequired,
    debounce: PropTypes.number
  }

  constructor(props) {
    super(props)
    this.state = {
      inputValue: props.value || '',
      options: props.options || []
    }
    this.formRef = React.createRef()
    this.onDebounceSearch = debounce(this.onSearch, props.debounce)
  }

  onSearch = async searchText => {
    const { props } = this
    const { remoteConfig } = props
    const query = searchText.trim()
    if (!query) {
      this.setState({ options: [] })
      return
    }
    const { fetch: fetchFunc, process: processFunc = noop } = remoteConfig
    const responseData = await fetchFunc(query)
    const options = convertDataToEnum(
      processFunc(responseData) || responseData,
      pick(remoteConfig, ['path', 'valueKey', 'labelKey'])
    )
    this.setState({ options })
  }

  render() {
    const { props, state } = this
    const { onChange } = props
    const { inputValue, options } = state
    const componentProps = omit(props, [
      'defaultValue',
      'value',
      'onChange',
      'onCustomChange',
      'options',
      'remoteConfig'
    ])

    if (isAntdV3) {
      componentProps.dataSource = options.map(v => {
        return {
          value: v.value,
          text: v.label
        }
      })
    } else {
      componentProps.options = options
    }

    return (
      <AutoComplete
        {...componentProps}
        ref={this.formRef}
        value={inputValue}
        onChange={text => {
          this.setState({
            inputValue: String(text).trim()
          })
        }}
        onSearch={this.onDebounceSearch}
        onSelect={val => {
          onChange(val)
          if (props.onCustomChange) {
            props.onCustomChange()
          }
          this.formRef.current.blur()
        }}
      />
    )
  }
}

export default Index
