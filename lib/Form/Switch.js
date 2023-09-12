import { Switch } from 'antd'
import { isFunction, omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'

class Index extends React.Component {
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
    const { initialValue, value, style } = this.props
    const { onChange } = this
    const componentProps = omit(this.props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'style'])
    return (
      <div style={style}>
        <Switch checked={value} defaultChecked={initialValue} onChange={onChange} {...componentProps} />
      </div>
    )
  }
}

export default Index
