import React, { Component } from 'react'
import { get, omit, cloneDeep, merge } from 'lodash'
import { isEmptyObject } from '@nbfe/tools'
import { Descriptions, Spin, Tooltip, Typography } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { getTooltipTitleNode } from '../Table/config'
import getRender from '../Table/Render'
import { componentName, getClassNames, defaultColumn } from './config'

const { Text } = Typography

const mergeColumns = (columns = []) => {
  return cloneDeep(columns).map(v => {
    return merge({}, defaultColumn, v)
  })
}

class Index extends Component {
  static displayName = componentName

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps) {
    const { dataSource } = nextProps
    return {
      dataSource,
      loading: isEmptyObject(dataSource || {})
    }
  }

  render() {
    const { props, state } = this

    const { columns, dataSource } = props

    const { loading } = state

    const DescriptionsProps = omit(props, ['columns', 'dataSource'])

    return (
      <Spin spinning={loading} size="large">
        <Descriptions {...DescriptionsProps} className={getClassNames()}>
          {mergeColumns(columns)
            .filter(v => Boolean(v.visible))
            .map((v, i) => {
              const { name, label, tooltip, render, transform, template } = v
              const value = get(dataSource, name)
              const key = [label, name, v.key, i].join('__')
              const DescriptionsItemProps = {
                ...omit(v, ['name']),
                key
              }
              if (tooltip) {
                getTooltipTitleNode
                DescriptionsItemProps.label = (
                  <>
                    <Text>{label}</Text>
                    <Tooltip title={getTooltipTitleNode(tooltip)}>
                      <QuestionCircleOutlined className={getClassNames('item-label-tooltip')} />
                    </Tooltip>
                  </>
                )
              }
              let content
              if (render) {
                content = render(value, dataSource, i)
              } else {
                content = getRender({
                  dataIndex: name,
                  transform,
                  template
                })(value, dataSource, i)
              }
              return <Descriptions.Item {...DescriptionsItemProps}>{content}</Descriptions.Item>
            })}
        </Descriptions>
      </Spin>
    )
  }
}

export default Index
