import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Select } from 'antd'
import { isFunction, omit } from 'lodash'
import { setAsyncState } from '@nbfe/tools'
import { getDisplayName } from './util'

const SubInputMap = {
  input: Input,
  textarea: Input.TextArea,
  password: Input.Password,
  search: Input.Search
}

class Index extends Component {
  static displayName = getDisplayName('Input')

  static defaultProps = {
    inputType: 'input',
    options: [],
    inputWidth: 200,
    selectWidth: 100
  }

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    inputType: PropTypes.oneOf(['input', 'textarea', 'password', 'search', 'select-search', 'select-input']),
    options: PropTypes.array,
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    inputWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    selectWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  }

  constructor(props) {
    super(props)
    this.state = {
      selectValue: null,
      inputValue: props.value
    }
  }

  componentDidMount() {
    const { props } = this
    const { value, inputType, options } = props
    if (['select-search', 'select-input'].includes(inputType)) {
      if (value === '') {
        this.setState({
          selectValue: options[0].value
        })
      }
      if (Array.isArray(value) && value.length === 2) {
        this.setState({
          selectValue: value[0],
          inputValue: value[1]
        })
      }
    }
  }

  onSelectChange = async value => {
    await setAsyncState(this, { selectValue: value })
    this.onChange()
  }

  onInputChange = async e => {
    await setAsyncState(this, { inputValue: e.target.value })
    this.onChange()
  }

  onChange = () => {
    const { props, state } = this
    const { onChange, inputType } = props
    if (!isFunction(onChange)) {
      return
    }
    const { selectValue, inputValue } = state
    if (['select-search', 'select-input'].includes(inputType)) {
      onChange([selectValue, inputValue])
      return
    }
    onChange(inputValue)
  }

  render() {
    const { props, state, onSelectChange, onInputChange } = this
    const { inputType, options, selectWidth, inputWidth } = props
    const { selectValue, inputValue } = state
    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onSearch', 'inputType', 'inputWidth', 'selectWidth'])
    if (['input', 'textarea', 'password', 'search'].includes(inputType)) {
      const InputComponent = SubInputMap[inputType]
      if (['input', 'search'].includes(inputType)) {
        componentProps.onPressEnter = () => {
          props.onSearch?.()
        }
        if (inputType === 'search') {
          componentProps.onSearch = () => {
            props.onSearch?.()
          }
        }
      }
      return <InputComponent {...componentProps} value={props.value} onChange={props.onChange} style={{ width: inputWidth }} />
    }
    if (['select-search', 'select-input'].includes(inputType)) {
      const { label } = options.find(v => v.value === selectValue) || {}
      return (
        <Input.Group compact>
          <Select disabled={props.disabled} value={selectValue} onChange={onSelectChange} style={{ width: selectWidth }}>
            {options.map(v => {
              return (
                <Select.Option value={v.value} key={v.value}>
                  {v.label}
                </Select.Option>
              )
            })}
          </Select>
          {inputType === 'select-search' ? (
            <Input.Search
              {...componentProps}
              value={inputValue}
              onChange={onInputChange}
              onSearch={() => {
                props.onSearch?.()
              }}
              style={{ width: inputWidth }}
              placeholder={['请输入', label].join('')}
            />
          ) : (
            <Input
              {...omit(componentProps, ['enterButton'])}
              value={inputValue}
              onChange={onInputChange}
              style={{ width: inputWidth }}
              placeholder={['请输入', label].join('')}
            />
          )}
        </Input.Group>
      )
    }
    return null
  }
}

export default Index
