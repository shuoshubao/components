/*
 * @Author: shuoshubao
 * @Date:   2022-04-20 17:50:17
 * @Last Modified by:   fangtao
 * @Last Modified time: 2023-06-26 11:17:32
 */
import { DownOutlined } from '@ant-design/icons'
import * as ColorsPicker from '@nbfe/react-color'
import { Button, Popover } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { getClassNames, getDisplayName } from './util'

class Index extends React.PureComponent {
  static displayName = getDisplayName('ColorPicker')

  static defaultProps = {
    type: 'SwatchesPicker',
    valueType: 'hex'
  }

  static propTypes = {
    type: PropTypes.oneOf(Object.keys(ColorsPicker)),
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    valueType: PropTypes.oneOf(['hex', 'rgb', 'hsl'])
  }

  render() {
    const { props } = this
    const { value, onChange, type, valueType, trigger, style } = props

    const getContent = () => {
      const ColorPicker = ColorsPicker[type]
      return (
        <ColorPicker
          color={value}
          triangle="hide"
          onChange={color => {
            onChange(color[valueType], color)
          }}
        />
      )
    }

    return (
      <Popover content={getContent()} className={getClassNames('color-picker')} trigger={trigger}>
        <Button
          style={{
            width: style?.width || 200,
            background: value,
            textAlign: 'right'
          }}
        >
          <DownOutlined />
        </Button>
      </Popover>
    )
  }
}

export default Index
