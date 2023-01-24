import React, { Component } from 'react'
import { get, omit, cloneDeep, merge, isEqual } from 'lodash'
import { isEmptyObject, isEmptyValue } from '@nbfe/tools'
import { Descriptions, Spin, Tooltip } from 'antd'
import { QuestionCircleOutlined } from '../Table/Icons'
import { getClassNames, getTooltipTitleNode, getComponentName } from '../Table/config'
import getRender from '../Table/Render'

const defaultColumn = {
  key: '',
  label: '',
  name: '',
  visible: true,
  tooltip: '',
  transform: null, // 数据转换器
  render: null, // 自定义渲染函数
  template: {
    tpl: 'text',
    emptyText: '--'
  }
}

const mergeColumns = (columns = []) => {
  return cloneDeep(columns).map(v => {
    return merge({}, defaultColumn, v)
  })
}

class Index extends Component {
  static displayName = getComponentName('Descriptions')

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!isEqual(nextProps.dataSource, prevState.dataSource)) {
      return {
        dataSource: nextProps.dataSource,
        loading: isEmptyObject(nextProps.dataSource) || isEmptyValue(nextProps.dataSource)
      }
    }
    return null
  }

  render() {
    const { props, state } = this

    const { columns, dataSource } = props

    const { loading } = state

    const DescriptionsProps = omit(props, ['columns', 'dataSource'])

    return (
      <Spin spinning={loading} tip="数据加载中...">
        <Descriptions {...DescriptionsProps} className={getClassNames('descriptions')}>
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
                    {label}
                    <Tooltip title={getTooltipTitleNode(tooltip)} overlayClassName={getClassNames('descriptions')}>
                      <QuestionCircleOutlined className={getClassNames('descriptions-item-label-tooltip')} />
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
