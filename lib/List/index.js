import { isEmptyArray, setAsyncState } from '@nbfe/tools'
import { List } from 'antd'
import { cloneDeep, debounce, get, identity, isFunction, omit } from 'lodash'
import React from 'react'
import { getClassNames, getComponentName } from '../Table/config'
import { defaultPagination } from '../Table/util'
import { getRenderItem } from './config'

class Index extends React.Component {
  static displayName = getComponentName('List')

  constructor(props) {
    super(props)
    const pagination = props.pagination || {}
    const { defaultCurrent, defaultPageSize } = { ...defaultPagination, ...pagination }
    const isLocalData = !isFunction(get(props, 'remoteConfig.fetch'))
    this.state = {
      isLocalData,
      fetchError: false, // 接口出错
      loading: false,
      dataSource: [],
      total: 0,
      current: defaultCurrent || 1,
      pageSize: defaultPageSize || 10
    }
    this.search = debounce(this.handleSearch, 100)
    // 缓存 searchParams
    this.cacheSearchParams = {}
  }

  static getDerivedStateFromProps(nextProps) {
    const isRemote = isFunction(get(nextProps, 'remoteConfig.fetch'))
    if (isRemote) {
      return null
    }
    const { dataSource } = nextProps
    return {
      dataSource
    }
  }

  // 分页 - 切换
  onPaginationChange = async page => {
    await setAsyncState(this, { current: page })
    this.handleSearch({}, false)
  }

  // 分页 - 每页的设置
  onShowSizeChange = (current, size) => {
    setTimeout(async () => {
      await setAsyncState(this, { pageSize: size, current: 1 })
      this.handleSearch({}, false)
    }, 0)
  }

  // 触发数据请求
  handleSearch = async (searchParams = {}, isReset = true) => {
    // 本地
    if (this.state.isLocalData) {
      return
    }
    // 重置
    // 回到第一页
    if (isReset) {
      await setAsyncState(this, { current: 1 })
    }
    const { props, state } = this
    const { pagination } = props
    const { current, pageSize } = state
    const {
      fetch: fetchFunc,
      process = identity,
      dataSourceKey,
      path,
      totalKey = 'total',
      pageSizeKey = 'pageSize',
      currentPageKey = 'currentPage'
    } = props.remoteConfig
    const paginationParams = {
      [pageSizeKey]: pageSize,
      [currentPageKey]: current
    }
    const fetchParams = {
      ...paginationParams,
      ...this.cacheSearchParams,
      ...searchParams
    }
    if (!pagination) {
      delete fetchParams[pageSizeKey]
      delete fetchParams[currentPageKey]
    }
    this.setState({ loading: true, fetchError: false })
    const resOrigin = await fetchFunc(fetchParams).catch(() => {
      this.setState({ fetchError: true })
    })
    this.setState({ loading: false })
    const res = process(cloneDeep(resOrigin)) || resOrigin
    const dataSource = get(res, dataSourceKey || path || 'list', [])
    const total = get(res, totalKey, 0)
    this.setState({ dataSource, total })
    if (isReset) {
      this.cacheSearchParams = { ...searchParams }
    }
  }

  render() {
    const { props, state, onPaginationChange, onShowSizeChange } = this
    const { renderItem, pagination } = props
    const { loading, dataSource, total, current, pageSize } = state
    const listProps = omit(props, ['dataSource', 'remoteConfig'])
    listProps.loading = loading
    // 分页设置
    if (pagination) {
      listProps.pagination = {
        ...defaultPagination,
        ...pagination,
        current,
        pageSize,
        onChange: onPaginationChange,
        onShowSizeChange,
        total: props.total || total || dataSource.length
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
