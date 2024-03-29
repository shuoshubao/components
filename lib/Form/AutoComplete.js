import { convertDataToEnum } from '@nbfe/tools'
import { AutoComplete } from 'antd'
import { debounce, noop, omit, pick } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { getDisplayName } from './util'

class Index extends React.Component {
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
    const options = convertDataToEnum(processFunc(responseData) || responseData, pick(remoteConfig, ['path', 'valueKey', 'labelKey']))
    this.setState({ options })
  }

  render() {
    const { props, state } = this
    const { onChange } = props
    const { inputValue, options } = state
    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'options', 'remoteConfig'])

    componentProps.options = options

    return (
      <AutoComplete
        {...componentProps}
        ref={this.formRef}
        value={inputValue}
        onChange={text => {
          this.setState({
            inputValue: String(text)
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
