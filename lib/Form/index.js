import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Space } from 'antd'
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons'
import { cloneDeep, debounce, isFunction, omit } from 'lodash'
import { isEmptyArray, setAsyncState, isEveryFalsy, classNames, pascalCase } from '@nbfe/tools'
import BuiltInComponents from './components'
import { componentName } from './config'
import FilterPanel from './FilterPanel'
import {
  getClassNames,
  validateColumns,
  mergeColumns,
  getInitialValues,
  getSearchValues,
  getFormItemLabelWidth,
  getFormItemProps,
  getFormItemNodeProps,
  forceUpdateColumns
} from './util'

class Index extends Component {
  static displayName = componentName

  static defaultProps = {
    columns: [],
    autoSubmit: false,
    showSubmit: false,
    showReset: false,
    okText: '查询',
    cancelText: '重置',
    okButtonProps: {},
    cancelButtonProps: {},
    labelWidth: 0,
    visibleFilterPanel: false
  }

  static propTypes = {
    columns: PropTypes.array,
    // 展示按钮: 提交
    showSubmit: PropTypes.bool,
    // 展示按钮: 重置
    showReset: PropTypes.bool,
    // 按钮文案: 提交
    okText: PropTypes.node,
    // 按钮文案: 重置
    cancelText: PropTypes.node,
    // 按钮属性: 提交
    okButtonProps: PropTypes.object,
    // 按钮属性: 重置
    cancelButtonProps: PropTypes.object,
    // 自动触发提交
    autoSubmit: PropTypes.bool,
    // 提交表单且数据验证成功后回调事件
    onFinish: PropTypes.func,
    // Form.Item label 的宽度
    labelWidth: PropTypes.number,
    // 是否显示 筛选区
    visibleFilterPanel: PropTypes.bool
  }

  constructor(props) {
    super(props)
    this.state = {
      columns: [],
      initialValues: {}
    }
    this.formRef = React.createRef()
    this.filterPanelRef = React.createRef()
  }

  async componentDidMount() {
    const { columns, autoSubmit } = this.props
    const innerColumns = mergeColumns(columns, this.props)
    validateColumns(innerColumns)
    // 初始值
    const initialValues = getInitialValues(innerColumns, this.props.initialValues)
    await setAsyncState(this, { columns: innerColumns, initialValues })
    if (isEmptyArray(innerColumns)) {
      return
    }
    if (autoSubmit) {
      this.formRef.current.submit()
    }
  }

  // 获取 formNode
  getFormRefNode = () => {
    return this.formRef.current
  }

  // 对外暴露
  forceUpdateColumns = callback => {
    const { columns } = this.state
    const updatedColumns = callback(columns) || columns
    this.setState({
      columns: updatedColumns
    })
  }

  // 透传 api: submit
  submit = () => {
    this.formRef.current.submit()
  }

  // 透传api getFieldsValue
  getFieldsValue = () => {
    const formRefNode = this.getFormRefNode()
    return formRefNode.getFieldsValue()
  }

  // 立即提交
  onImmediateSubmit = column => {
    const { immediate, template } = column
    const { tpl } = template
    this.debounceFilterPanelSetFields()
    if (!immediate) {
      return
    }
    // 自定义组件
    if (isFunction(tpl)) {
      return
    }
    if (['input', 'slider'].includes(tpl)) {
      return
    }
    this.formRef.current.submit()
  }

  // 提交
  onFinish = debounce(() => {
    const { state, props } = this
    const { columns } = state
    const formRefNode = this.getFormRefNode()
    if (!formRefNode) {
      return
    }
    const values = formRefNode.getFieldsValue(true)
    const params = getSearchValues(values, columns)
    props.onFinish?.(params)
    this.debounceFilterPanelSetFields()
  }, 300)

  // 筛选域
  debounceFilterPanelSetFields = debounce(() => {
    const { visibleFilterPanel } = this.props
    if (visibleFilterPanel) {
      this.filterPanelRef.current.setFields()
    }
  }, 300 + 10)

  // 重置
  handleReset = () => {
    const { columns } = this.state
    const formRefNode = this.getFormRefNode()
    const values = formRefNode.getFieldsValue(true)
    formRefNode.resetFields()
    columns.forEach(column => {
      const {
        name,
        template: { tpl, emitReset }
      } = column
      if (tpl === 'tabs' && emitReset) {
        formRefNode.setFieldsValue({ [name]: values[name] })
      }
    })
    this.formRef.current.submit()
  }

  getFormItemNode = v => {
    const { state } = this
    const { columns } = state
    const { name, template } = v
    const { tpl } = template
    const formItemNodeProps = getFormItemNodeProps(v)
    formItemNodeProps.onChange = async () => {
      this.onImmediateSubmit(v)
      const { onChange } = template
      // 额外的 onChange 事件
      if (onChange) {
        const formRefNode = this.getFormRefNode()
        const { setFieldsValue } = formRefNode
        const allFields = formRefNode.getFieldsValue()
        const updatedColumns = await onChange(allFields[name], {
          columns: cloneDeep(columns),
          setFieldsValue,
          allFields,
          forceUpdateColumns: fields => {
            return forceUpdateColumns({ columns, setFieldsValue, fields })
          }
        })
        this.setState({ columns: cloneDeep(updatedColumns) || columns })
      }
    }

    let formItemNode = null

    if (Object.keys(BuiltInComponents).includes(tpl)) {
      const BuiltInComponent = BuiltInComponents[tpl]
      if (tpl === 'input') {
        formItemNodeProps.onFinish = () => {
          this.formRef.current.submit()
        }
      }

      if (tpl === 'tabs') {
        const { emitReset = false } = formItemNodeProps
        formItemNodeProps.onCustomChange = () => {
          // 触发重置, 清空其他条件
          if (emitReset) {
            this.handleReset()
          }
        }
      }

      if (tpl === 'segmented') {
        formItemNodeProps.style = {}
      }

      if (tpl === 'slider') {
        formItemNodeProps.onCustomChange = () => {
          this.formRef.current.submit()
        }
      }
      formItemNode = <BuiltInComponent {...formItemNodeProps} />
    }

    // 自定义组件
    if (isFunction(tpl)) {
      const DynamicComponent = tpl
      formItemNode = <DynamicComponent {...formItemNodeProps} />
    }

    return formItemNode
  }

  // Form.Item
  renderColumns = () => {
    const { props, state } = this
    const { children } = props
    const { columns } = state

    const columnsNode = columns
      .filter(v => Boolean(v.visible))
      .map((v, i) => {
        const { name, label, tooltip, colon, formListConfig } = v
        const formItemProps = getFormItemProps(v, { index: i })
        // Form.List
        if (formListConfig) {
          const {
            min = 0, // 最少项
            max = Infinity, // 最多项
            record = null, // 新增一行时的填充数据
            rules = [], // 每一项的校验
            position = 'tail', // 新增到头部还是尾部 tail | head
            addText = '添加一行数据',
            addButtonWidth = 200, // 新增按钮 宽度
            addButtonProps = {} // 新增按钮 其他属性
          } = formListConfig
          if (!['tail', 'head'].includes(position)) {
            throw new Error(`[${componentName}] formListConfig.position 参数非法, 需为其中一种: tail|head`)
          }
          const formItemNode = this.getFormItemNode(v)
          const emptyLabelNode = ' '
          return (
            <Form.List name={name} key={formItemProps.key} rules={formItemProps.rules}>
              {(fields, action, { errors }) => {
                const { add, remove } = action
                return (
                  <>
                    {fields.map((field, index) => {
                      if (index === 0) {
                        formItemProps.label = label
                        formItemProps.colon = colon
                        formItemProps.tooltip = tooltip
                      } else {
                        formItemProps.label = emptyLabelNode
                        formItemProps.tooltip = ''
                        formItemProps.colon = false
                      }
                      return (
                        <Form.Item {...omit(formItemProps, ['name'])} key={field.key}>
                          <Form.Item
                            {...field}
                            rules={rules.map(v2 => {
                              if (isFunction(v2)) {
                                return v2(label, index, name)
                              }
                              return v2
                            })}
                            validateTrigger={['onChange', 'onBlur']}
                            noStyle
                          >
                            {formItemNode}
                          </Form.Item>
                          <Space style={{ marginLeft: 12 }}>
                            {fields.length > min && (
                              <DeleteOutlined
                                onClick={() => {
                                  remove(field.name)
                                }}
                              />
                            )}
                          </Space>
                        </Form.Item>
                      )
                    })}
                    <Form.Item
                      key={formItemProps.key}
                      label={fields.length === 0 ? formItemProps.label : emptyLabelNode}
                      colon={fields.length === 0 ? colon : false}
                      tooltip={fields.length === 0 ? tooltip : ''}
                    >
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        disabled={fields.length >= max}
                        onClick={() => {
                          if (position === 'tail') {
                            add(record)
                          } else {
                            add(record, 0)
                          }
                        }}
                        style={{ width: addButtonWidth }}
                        {...addButtonProps}
                      >
                        {addText}
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )
              }}
            </Form.List>
          )
        }

        return <Form.Item {...formItemProps}>{this.getFormItemNode(v)}</Form.Item>
      })
    if (children) {
      const childrenNode = (
        <Form.Item colon={false} key="-1" label=" ">
          {props.children}
        </Form.Item>
      )
      columnsNode.push(childrenNode)
    }
    return columnsNode
  }

  // 查询, 重置
  renderSearchReset = () => {
    const { props, state, handleReset } = this
    const { okText, cancelText, okButtonProps, cancelButtonProps, showSubmit, showReset } = props
    const { columns } = state
    if (isEveryFalsy(showSubmit, showReset)) {
      return null
    }
    return (
      <Form.Item colon={false} className={getClassNames('form-item')} label=" ">
        <Space>
          {showSubmit && (
            <Button type="primary" htmlType="submit" {...okButtonProps}>
              {okText}
            </Button>
          )}
          {showReset && (
            <Button onClick={handleReset} {...cancelButtonProps}>
              {cancelText}
            </Button>
          )}
        </Space>
      </Form.Item>
    )
  }

  render() {
    const { props, state, renderColumns, renderSearchReset } = this
    const { columns, initialValues } = state
    const { labelWidth, visibleFilterPanel } = props
    if (isEmptyArray(columns)) {
      return null
    }

    const formProps = omit(props, ['columns', 'autoSubmit', 'showSubmit', 'showReset', 'labelWidth', 'visibleFilterPanel'])

    formProps.onFinish = this.onFinish

    formProps.initialValues = initialValues

    formProps.labelCol = {
      style: { width: labelWidth || getFormItemLabelWidth(columns) }
    }

    if (props.onValuesChange) {
      formProps.onValuesChange = (changedFields, allFields) => {
        const formRefNode = this.getFormRefNode()
        const [[key, value]] = Object.entries(changedFields)
        props.onValuesChange(
          {
            key,
            value,
            changedFields: cloneDeep(changedFields),
            allFields: cloneDeep(allFields)
          },
          {
            columns: cloneDeep(columns),
            updateColumns: list => {
              this.setState({ columns: list })
            },
            ...formRefNode
          }
        )
      }
    }
    return (
      <div className={classNames(getClassNames())}>
        <Form {...formProps} ref={this.formRef}>
          {renderColumns()}
          {renderSearchReset()}
        </Form>
        {visibleFilterPanel && (
          <FilterPanel
            ref={this.filterPanelRef}
            columns={columns}
            getFieldsValue={() => {
              return this.formRef.current.getFieldsValue()
            }}
            onChange={fields => {
              this.formRef.current.setFields(fields)
              this.formRef.current.submit()
            }}
          />
        )}
      </div>
    )
  }
}

export default Index
