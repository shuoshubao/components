import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { omit, last, isNumber } from 'lodash'
import { Tabs } from 'antd'
import { getDisplayName } from './util'

const { TabPane } = Tabs

class Index extends PureComponent {
  static displayName = getDisplayName('Tabs')

  static defaultProps = {}

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func
  }

  render() {
    const { props } = this
    const { onChange, options } = props
    const shouldBeNumber = isNumber(last(options).value)
    const innerValue = String(props.value)
    const componentProps = omit(props, ['defaultValue', 'value', 'onChange', 'onCustomChange', 'style', 'emitReset'])
    return (
      <Tabs
        animated={false}
        {...componentProps}
        activeKey={innerValue}
        defaultActiveKey={innerValue}
        onChange={activeKey => {
          onChange(shouldBeNumber ? Number(activeKey) : activeKey)
          if (props.onCustomChange) {
            props.onCustomChange()
          }
        }}
      >
        {options.map(v => {
          const { value, label } = v
          return <TabPane tab={label} key={value} />
        })}
      </Tabs>
    )
  }
}

export default Index
