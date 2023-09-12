import { isEmptyArray } from '@nbfe/tools'
import { List } from 'antd'
import React from 'react'
import { getClassNames, getComponentName } from '../Table/config'
import { getRenderItem } from './config'

class Index extends React.PureComponent {
  static displayName = getComponentName('List')

  render() {
    const { props } = this
    const { renderItem, pagination, onPaginationChange, onShowSizeChange, ...listProps } = props
    // 分页设置
    if (pagination) {
      listProps.pagination = {
        ...pagination,
        onChange: onPaginationChange,
        onShowSizeChange
      }
    } else {
      listProps.pagination = false
    }

    if (isEmptyArray(listProps.dataSource)) {
      listProps.pagination = false
    }

    listProps.renderItem = getRenderItem(renderItem)

    return <List {...listProps} className={getClassNames('list')} />
  }
}

export default Index
