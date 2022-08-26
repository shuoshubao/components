import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { InputNumber, Input } from 'antd'
import { omit } from 'lodash'
import { isEveryTruthy, isEmptyValue, setAsyncState } from '@nbfe/tools'
import { getDisplayName, getClassNames } from './util'

class Index extends Component {
  static displayName = getDisplayName('NumberRange')

  static defaultProps = {
    placeholder: '最小值,最大值',
    separator: '~',
    separatorWidth: 30
  }

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string, // placeholder
    separator: PropTypes.string, // 分割符
    separatorWidth: PropTypes.number // 分割符宽度
  }

  constructor(props) {
    super(props)
    const value = props.value || []
    this.state = {
      minValue: value[0],
      maxValue: value[1]
    }
  }

  onInputChange() {
    const { props, state } = this
    const { onChange } = props
    const { minValue, maxValue } = state
    // 反转
    const isNeedReverse = isEveryTruthy(!isEmptyValue(minValue), !isEmptyValue(maxValue), minValue > maxValue)
    if (isNeedReverse) {
      onChange([maxValue, minValue])
    } else {
      onChange([minValue, maxValue])
    }
    if (this.props.onCustomChange) {
      this.props.onCustomChange()
    }
  }

  render() {
    const { props, state } = this

    const { placeholder, style, separator, separatorWidth } = props
    const { minValue, maxValue } = state

    const inputWidth = `calc(50% - ${separatorWidth / 2}px)`

    const componentProps = omit(props, [
      'defaultValue',
      'value',
      'onChange',
      'onCustomChange',
      'style',
      'separator',
      'separatorWidth'
    ])

    return (
      <Input.Group compact className={getClassNames('number-range')} style={style}>
        <InputNumber
          disabled={props.disabled}
          value={minValue}
          onChange={async value => {
            await setAsyncState(this, { minValue: value })
            this.onInputChange()
          }}
          className={getClassNames('number-range-min')}
          style={{
            width: inputWidth
          }}
          {...componentProps}
          placeholder={placeholder.split(',')[0]}
        />
        <Input
          disabled
          className={getClassNames('number-range-separator')}
          style={{
            width: separatorWidth
          }}
          placeholder={separator}
        />
        <InputNumber
          disabled={props.disabled}
          value={maxValue}
          onChange={async value => {
            await setAsyncState(this, { maxValue: value })
            this.onInputChange()
          }}
          className={getClassNames('number-range-max')}
          style={{
            width: inputWidth
          }}
          {...componentProps}
          placeholder={placeholder.split(',')[1]}
        />
      </Input.Group>
    )
  }
}

export default Index
