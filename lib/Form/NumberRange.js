import { isEmptyValue, isEveryTruthy, setAsyncState } from '@nbfe/tools'
import { Input, InputNumber, Typography } from 'antd'
import { omit } from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import { getClassNames, getDisplayName } from './util'

const { Text } = Typography

class Index extends React.Component {
  static displayName = getDisplayName('NumberRange')

  static defaultProps = {
    placeholder: '最小值,最大值',
    separator: '~'
  }

  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    placeholder: PropTypes.string, // placeholder
    separator: PropTypes.string // 分割符
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

    const { placeholder, style, separator } = props
    const { minValue, maxValue } = state

    const componentProps = omit(props, ['initialValue', 'value', 'onChange', 'onCustomChange', 'style', 'separator'])

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
          {...componentProps}
          placeholder={placeholder.split(',')[0]}
        />
        <Text type="secondary" className={getClassNames('number-range-separator')}>
          {separator}
        </Text>
        <InputNumber
          disabled={props.disabled}
          value={maxValue}
          onChange={async value => {
            await setAsyncState(this, { maxValue: value })
            this.onInputChange()
          }}
          className={getClassNames('number-range-max')}
          {...omit(componentProps, ['id'])}
          placeholder={placeholder.split(',')[1]}
        />
      </Input.Group>
    )
  }
}

export default Index
