import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit } from 'lodash'
import { Tabs } from 'antd'
import { getDisplayName } from './util'

class Index extends PureComponent {
  static displayName = getDisplayName('Tabs')

  static defaultProps = {}

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  render() {
    const { props } = this
    const { value, onChange } = props
    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'style', 'emitReset'])
    return (
      <Tabs
        animated={false}
        {...componentProps}
        activeKey={value}
        defaultActiveKey={value}
        onChange={activeKey => {
          onChange(activeKey)
          if (props.onCustomChange) {
            props.onCustomChange()
          }
        }}
      />
    )
  }
}

export default Index
