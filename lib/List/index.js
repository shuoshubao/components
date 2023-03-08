import React, { Component, isValidElement } from 'react'
import { List } from 'antd'
import { get, isFunction, isPlainObject } from 'lodash'
import { getClassNames, getComponentName } from '../Table/config'
import { getActionsNode, getMetaNode } from './config'

class Index extends Component {
  static displayName = getComponentName('List')

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    const isLocalData = !isFunction(get(props, 'remoteConfig.fetch'))
    this.state = {
      isLocalData
    }
  }

  componentDidMount() {
    const { props, state } = this
    const { isLocalData } = state
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isRemote = isFunction(get(nextProps, 'remoteConfig.fetch'))
    if (isRemote) {
      return null
    }
    const { dataSource } = nextProps
    return {
      dataSource
    }
  }

  render() {
    const { props } = this
    const { renderItem, ...restProps } = props
    return (
      <List
        {...restProps}
        renderItem={(item, index) => {
          if (!isFunction(renderItem)) {
            if (!isValidElement(item) && isPlainObject(item)) {
              return <List.Item>{JSON.stringify(item)}</List.Item>
            }
            return <List.Item>{item}</List.Item>
          }
          const { actions, extra, content, meta } = renderItem(item, index)
          return (
            <List.Item actions={getActionsNode(actions)} extra={extra}>
              {getMetaNode(meta)}
              {content}
            </List.Item>
          )
        }}
        className={getClassNames('list')}
      />
    )
  }
}

export default Index
