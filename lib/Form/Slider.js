import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Slider, InputNumber } from 'antd'
import { omit } from 'lodash'

class Index extends Component {
  static displayName = 'DynamicFormSlider'

  static defaultProps = {
    InputNumberWidth: 65
  }

  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    InputNumberWidth: PropTypes.number
  }

  onChange = value => {
    this.props.onChange(value)
  }

  onAfterChange = value => {
    this.props.onChange(value)
    if (this.props.onCustomChange) {
      this.props.onCustomChange()
    }
  }

  render() {
    const { props, onChange, onAfterChange } = this
    const { value, style, InputNumberWidth } = props
    const componentProps = omit(props, [
      'defaultValue',
      'value',
      'onChange',
      'onCustomChange',
      'style',
      'InputNumberWidth'
    ])
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          ...style
        }}
      >
        <Slider
          style={{ width: style.width - InputNumberWidth - 15 }}
          value={value}
          onChange={onChange}
          onAfterChange={onAfterChange}
          {...componentProps}
        />
        <InputNumber style={{ width: InputNumberWidth }} value={value} onChange={onAfterChange} {...componentProps} />
      </div>
    )
  }
}

export default Index
