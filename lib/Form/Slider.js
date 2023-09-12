import { InputNumber, Slider } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

class Index extends React.Component {
  static displayName = 'DynamicFormSlider'

  static defaultProps = {
    inputWidth: 65
  }

  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    inputWidth: PropTypes.number
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
    const { value, style, inputWidth } = props
    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'style', 'inputWidth'])
    // 不显示 InputNumber
    if (inputWidth === 0) {
      return <Slider style={style} value={value} onChange={onChange} onAfterChange={onAfterChange} {...componentProps} />
    }
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          ...style
        }}
      >
        <Slider style={{ width: style.width - inputWidth - 20 }} value={value} onChange={onChange} onAfterChange={onAfterChange} {...componentProps} />
        <InputNumber style={{ width: inputWidth }} value={value} onChange={onAfterChange} {...componentProps} />
      </div>
    )
  }
}

export default Index
