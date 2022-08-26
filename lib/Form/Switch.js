import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Switch } from 'antd'
import { isFunction, omit } from 'lodash'

class Index extends Component {
  static displayName = 'DynamicFormSwitch'

  static defaultProps = {}

  static propTypes = {
    value: PropTypes.bool,
    onChange: PropTypes.func
  }

  onChange = (checked, event) => {
    if (!isFunction(this.props.onChange)) {
      return
    }
    this.props.onChange(checked, event)
    if (this.props.onCustomChange) {
      this.props.onCustomChange()
    }
  }

  render() {
    const { defaultValue, value, style } = this.props
    const { onChange } = this
    const componentProps = omit(this.props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style'])
    return (
      <div style={style}>
        <Switch checked={value} defaultChecked={defaultValue} onChange={onChange} {...componentProps} />
      </div>
    )
  }
}

export default Index
