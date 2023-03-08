import React, { PureComponent } from 'react'
import { List } from 'antd'
import { omit } from 'lodash'
import { isEmptyArray } from '@nbfe/tools'
import { getClassNames, getComponentName } from '../Table/config'
import { getRenderItem } from './config'

class Index extends PureComponent {
  static displayName = getComponentName('List')

  render() {
    const { props } = this
    const { dataSource, renderItem, pagination, onPaginationChange, onShowSizeChange } = props
    const listProps = omit(props, 'pagination', 'onPaginationChange', 'onShowSizeChange')
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

    if (isEmptyArray(dataSource)) {
      listProps.pagination = false
    }

    listProps.dataSource = dataSource
    listProps.renderItem = getRenderItem(renderItem)

    return <List {...listProps} className={getClassNames('list')} />
  }
}

export default Index
