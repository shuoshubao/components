import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tooltip, Popover, Checkbox } from 'antd'
import { map, isNull } from 'lodash'
import { FullscreenOutlined, FullscreenExitOutlined, SettingOutlined, MenuOutlined, AppstoreOutlined } from '@ant-design/icons'
import { getComponentName, getClassNames } from './config'
import { getStorageKey, getTitleNode } from './util'

class Index extends Component {
  static displayName = getComponentName('Toolbar')

  static propTypes = {
    storageKey: PropTypes.string,
    showFullScreen: PropTypes.bool,
    showColumnsSetting: PropTypes.bool,
    showViewMode: PropTypes.bool,
    columns: PropTypes.array,
    onViewModeChange: PropTypes.func.isRequired,
    onColumnsSettingChange: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      isTable: props.viewMode === 'table',
      checkedList: [], // 选中的
      indeterminate: false, // 半角
      checkAll: true, // 全选
      fullscreened: false, // 全屏
      columnsSettingStorageKey: getStorageKey('ColumnsSetting', props.storageKey),
      viewModeStorageKey: getStorageKey('ViewMode', props.storageKey)
    }
  }

  componentDidMount() {
    const { props, state } = this
    const { columns } = props
    const { columnsSettingStorageKey } = state
    const value = JSON.parse(window.localStorage.getItem(columnsSettingStorageKey))
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

  onColumnsSettingChange = value => {
    const { props, state } = this
    const { columns } = props
    const { columnsSettingStorageKey } = state
    const checkedList = value
    this.setState({
      checkedList,
      indeterminate: !!value.length && value.length < columns.length,
      checkAll: value.length === columns.length
    })
    this.props.onColumnsSettingChange(checkedList)
    window.localStorage.setItem(columnsSettingStorageKey, JSON.stringify(checkedList))
  }

  onCheckAllChange = e => {
    const { props, state } = this
    const { columns } = props
    const { columnsSettingStorageKey } = state
    const { checked } = e.target
    const checkedList = checked ? map(columns, 'title') : []
    this.setState({
      checkedList,
      indeterminate: false,
      checkAll: checked
    })
    this.props.onColumnsSettingChange(checkedList)
    window.localStorage.setItem(columnsSettingStorageKey, JSON.stringify(checkedList))
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
    const { state, props, onColumnsSettingChange } = this
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
        onChange={onColumnsSettingChange}
      />
    )
  }

  render() {
    const { props, state, getPopoverTitle, getPopoverContent } = this
    const { showFullScreen, showColumnsSetting, showViewMode, listViewText, getPopupContainer } = props
    const { isTable, fullscreened, viewModeStorageKey } = state
    const FullscreenIcon = fullscreened ? FullscreenExitOutlined : FullscreenOutlined
    const ViewSwitcherIcon = isTable ? AppstoreOutlined : MenuOutlined
    return (
      <>
        {!!showFullScreen && (
          <Tooltip
            title={fullscreened ? '退出全屏' : '全屏'}
            placement={fullscreened ? 'bottom' : 'top'}
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
                    props.onFullscreenChange(!fullscreened)
                  }
                )
              }}
            />
          </Tooltip>
        )}
        {!!showColumnsSetting && (
          <Popover
            title={getPopoverTitle()}
            trigger="click"
            content={getPopoverContent()}
            placement="bottom"
            arrowPointAtCenter
            overlayClassName={getClassNames('columns-setting-popover')}
            getPopupContainer={getPopupContainer}
          >
            <Tooltip title="表头设置" placement={fullscreened ? 'bottom' : 'top'} arrowPointAtCenter getPopupContainer={getPopupContainer}>
              <SettingOutlined className={getClassNames('toolbar-icon')} />
            </Tooltip>
          </Popover>
        )}
        {!!showViewMode && (
          <Tooltip
            title={['切换至', isTable ? listViewText : '表格', '视图'].join('')}
            placement="top"
            arrowPointAtCenter
            getPopupContainer={getPopupContainer}
          >
            <ViewSwitcherIcon
              className={getClassNames('toolbar-icon')}
              onClick={() => {
                this.setState(
                  prevState => {
                    return {
                      isTable: !prevState.isTable
                    }
                  },
                  () => {
                    const value = isTable ? 'list' : 'table'
                    props.onViewModeChange(value)
                    window.localStorage.setItem(viewModeStorageKey, value)
                  }
                )
              }}
            />
          </Tooltip>
        )}
      </>
    )
  }
}

export default Index
