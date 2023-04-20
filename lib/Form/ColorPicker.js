/*
 * @Author: shuoshubao
 * @Date:   2022-04-20 17:50:17
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-05-09 14:27:53
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Button } from 'antd'
import * as ColorsPicker from '@nbfe/react-color'
import DownOutlined from '@ant-design/icons/DownOutlined'
import { getDisplayName, getClassNames } from './util'

class Index extends Component {
  static displayName = getDisplayName('ColorPicker')

  static defaultProps = {
    type: 'SwatchesPicker',
    valueType: 'hex'
  }

  static propTypes = {
    type: PropTypes.oneOf(Object.keys(ColorsPicker)),
    trigger: PropTypes.array,
    valueType: PropTypes.oneOf(['hex', 'rgb', 'hsl'])
  }

  render() {
    const { props } = this
    const { value, onChange, type, valueType, trigger, style } = props

    const getOverlay = () => {
      const ColorPicker = ColorsPicker[type]
      return (
        <ColorPicker
          color={value}
          onChange={color => {
            onChange(color[valueType], color)
          }}
        />
      )
    }

    return (
      <Dropdown overlay={getOverlay()} className={getClassNames('color-picker')} trigger={trigger}>
        <Button
          style={{
            width: style?.width || 200,
            background: value,
            textAlign: 'right'
          }}
        >
          <DownOutlined.default />
        </Button>
      </Dropdown>
    )
  }
}

export default Index
