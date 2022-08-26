import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Popover, Checkbox } from 'antd'
import { map, isNull } from 'lodash'
import { FullscreenOutlined, FullscreenExitOutlined, SettingOutlined } from './Icons'
import { getComponentName, getClassNames } from './config'
import { getStorageKey, getTitleNode } from './util'

class Index extends Component {
  static displayName = getComponentName('Toolbar')

  static propTypes = {
    storageKey: PropTypes.string,
    fullScreen: PropTypes.bool,
    columns: PropTypes.array,
    onColumnsChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      checkedList: [], // 选中的
      indeterminate: false, // 半角
      checkAll: true, // 全选
      fullscreened: false // 全屏
    }
  }

  componentDidMount() {
    const { columns } = this.props
    const storageKey = getStorageKey(this.props.storageKey)
    if (storageKey) {
      const value = JSON.parse(window.localStorage.getItem(storageKey))
      // 未设置
      if (isNull(value)) {
        this.setState({
          checkedList: map(columns, 'title'),
          indeterminate: false,
          checkAll: true
        })
        return
      }
      this.setState({
        checkedList: value,
        indeterminate: !!value.length && value.length < columns.length,
        checkAll: value.length === columns.length
      })
    }
  }

  onChange = value => {
    const { columns } = this.props
    const storageKey = getStorageKey(this.props.storageKey)
    const checkedList = value
    this.setState({
      checkedList,
      indeterminate: !!value.length && value.length < columns.length,
      checkAll: value.length === columns.length
    })
    this.props.onColumnsChange(checkedList)
    window.localStorage.setItem(storageKey, JSON.stringify(checkedList))
  }

  onCheckAllChange = e => {
    const { columns } = this.props
    const storageKey = getStorageKey(this.props.storageKey)
    const { checked } = e.target
    const checkedList = checked ? map(columns, 'title') : []
    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked
    })
    this.props.onColumnsChange(checkedList)
    window.localStorage.setItem(storageKey, JSON.stringify(checkedList))
  }

  getPopoverTitle = () => {
    const { state, onCheckAllChange } = this
    const { indeterminate, checkAll } = state
    return (
      <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
        表头设置
      </Checkbox>
    )
  }

  getPopoverContent = () => {
    const { state, props, onChange } = this
    const { columns, getPopupContainer } = props
    const { checkedList } = state
    return (
      <Checkbox.Group
        value={checkedList}
        options={columns.map(v => {
          const { title, tooltip } = v
          return {
            label: getTitleNode({ title, tooltip }, getPopupContainer),
            value: title
          }
        })}
        onChange={onChange}
      />
    )
  }

  render() {
    const { props, state, getPopoverTitle, getPopoverContent } = this
    const { storageKey, fullScreen, getPopupContainer } = props
    const { fullscreened } = state
    const FullscreenIcon = fullscreened ? FullscreenExitOutlined : FullscreenOutlined
    return (
      <Fragment>
        {!!fullScreen && (
          <Tooltip
            title={fullscreened ? '退出全屏' : '全屏'}
            placement={fullscreened ? 'bottomRight' : 'topRight'}
            arrowPointAtCenter
            getPopupContainer={getPopupContainer}
          >
            <FullscreenIcon
              className={getClassNames('toolbar-icon')}
              onClick={() => {
                this.setState(
                  prevState => {
                    return {
                      fullscreened: !prevState.fullscreened
                    }
                  },
                  () => {
                    props.onFullscreenonChange(!fullscreened)
                  }
                )
              }}
            />
          </Tooltip>
        )}
        {!!storageKey && (
          <Popover
            title={getPopoverTitle()}
            trigger="click"
            content={getPopoverContent()}
            placement="bottomRight"
            arrowPointAtCenter
            overlayClassName={getClassNames('columns-setting-popover')}
            getPopupContainer={getPopupContainer}
          >
            <Tooltip
              title="表头设置"
              placement={fullscreened ? 'bottomRight' : 'topRight'}
              arrowPointAtCenter
              getPopupContainer={getPopupContainer}
            >
              <SettingOutlined className={getClassNames('toolbar-icon')} />
            </Tooltip>
          </Popover>
        )}
      </Fragment>
    )
  }
}

export default Index
