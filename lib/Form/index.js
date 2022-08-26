import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { cloneDeep, debounce, isFunction, omit, merge, isNull } from 'lodash'
import { isEmptyArray, setAsyncState, isEveryFalsy, classNames, pascalCase } from '@nbfe/tools'
import { Form, Card, Button, Tooltip, message } from 'antd'
import BuiltInComponents from './components'
import { CopyOutlined, DeleteOutlined, PlusOutlined } from './Icons'
import { isAntdV3, componentName, defaulCardProps, defaulFormProps, defaultExtraConfig } from './config'
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
    disabled: false, // false: 编辑模式; true: 详情模式
    autoSubmit: true,
    showSearchBtn: false,
    showResetBtn: true,
    cardProps: {},
    formProps: {},
    labelWidth: 0,
    visibleFilterPanel: false,
    extraConfig: defaultExtraConfig
  }

  static propTypes = {
    disabled: PropTypes.bool,
    columns: PropTypes.array.isRequired,
    // 自动触发搜索
    autoSubmit: PropTypes.bool,
    // 展示搜索按钮
    showSearchBtn: PropTypes.bool,
    // 展示重置按钮
    showResetBtn: PropTypes.bool,
    // 事件: 提交 (submitData, formData) => {}
    onSubmit: PropTypes.func,
    // 事件: 重置 (columns)
    onReset: PropTypes.func,
    // Card 的属性 https://ant.design/components/card-cn/#API
    cardProps: PropTypes.object,
    // Form 的属性 https://ant.design/components/form-cn/#API
    formProps: PropTypes.object,
    // Form.Item label 的宽度
    labelWidth: PropTypes.number,
    // 是否显示 筛选区
    visibleFilterPanel: PropTypes.bool,
    // 额外配置
    extraConfig: PropTypes.object
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
    const { disabled, columns, autoSubmit } = this.props
    const innerColumns = mergeColumns(columns, { disabled })
    validateColumns(innerColumns)
    // 初始值
    const initialValues = getInitialValues(innerColumns)
    await setAsyncState(this, { columns: innerColumns, initialValues })
    if (isEmptyArray(innerColumns)) {
      return
    }
    if (autoSubmit) {
      this.onSearch()
    }
  }

  // 获取 formNode
  getFormRefNode = () => {
    return this.formRef.current
  }

  // 取值 先校验, 如有错误, 则返回 null; 如校验通过, 则返回 values
  getFormData = () => {
    const { columns } = this.state
    const formRefNode = this.getFormRefNode()
    const { validateFields } = formRefNode
    return new Promise(reslove => {
      validateFields()
        .then(values => {
          reslove(getSearchValues(values, columns))
        })
        .catch(() => {
          reslove(null)
          message.error('表单项填写存在错误！请检查', 2)
        })
    })
  }

  // 对外暴露
  forceUpdateColumns = callback => {
    const { columns } = this.state
    const updatedColumns = callback(columns) || columns
    this.setState({
      columns: updatedColumns
    })
  }

  // 透传api getFieldsValue
  getFieldsValue = () => {
    const formRefNode = this.getFormRefNode()
    return formRefNode.getFieldsValue()
  }

  // 立即查询
  onImmediateSearch = column => {
    const { immediate, template } = column
    const { tpl } = template
    this.debounceFilterPanelSetFields()
    if (!immediate) {
      return
    }
    if (['input', 'slider'].includes(tpl)) {
      return
    }
    this.onSearch()
  }

  // 查询
  onSearch = debounce(() => {
    const { state, props } = this
    const { columns } = state
    const formRefNode = this.getFormRefNode()
    if (!formRefNode) {
      return
    }
    const params = formRefNode.getFieldsValue()
    const searchValues = getSearchValues(params, columns)
    if (isFunction(props.onSubmit)) {
      props.onSubmit(searchValues, params)
    }
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
  onReset = async () => {
    const { columns } = this.state
    const formRefNode = this.getFormRefNode()
    const values = formRefNode.getFieldsValue(true)
    formRefNode.resetFields()
    columns.forEach(column => {
      const {
        name,
        template: { tpl }
      } = column
      if (tpl === 'tabs') {
        formRefNode.setFieldsValue({ [name]: values[name] })
      }
    })
    if (this.props.onReset) {
      const updatedColumns = await this.props.onReset(columns)
      if (updatedColumns) {
        await setAsyncState(this, { columns: cloneDeep(updatedColumns) })
      }
    }
    this.onSearch()
  }

  getFormItemNode = v => {
    const { state } = this
    const { columns } = state
    const { name, template } = v
    const { tpl } = template
    const formItemNodeProps = getFormItemNodeProps(v)
    formItemNodeProps.onChange = async () => {
      this.onImmediateSearch(v)
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
        formItemNodeProps.onSearch = this.onSearch
      }

      if (tpl === 'tabs') {
        const { emitReset = false } = formItemNodeProps
        formItemNodeProps.onCustomChange = () => {
          // 触发重置, 清空其他条件
          if (emitReset) {
            this.onReset()
          }
        }
      }

      if (tpl === 'slider') {
        formItemNodeProps.onCustomChange = () => {
          this.onSearch()
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
    const labelWidth = props.labelWidth || getFormItemLabelWidth(columns)

    const columnsNode = columns
      .filter(v => Boolean(v.visible))
      .map((v, i) => {
        const { name, label, formListConfig, template } = v
        const formItemProps = getFormItemProps(v, { index: i, labelWidth })
        // Form.List
        if (formListConfig) {
          const {
            min = 1, // 最少
            max = 3, // 最多
            record = null, // 新增一行时的空数据
            rules = [] // 整体的校验
          } = formListConfig || {}
          const formItemNode = this.getFormItemNode(v)
          const emptyLabelNode = <span style={{ width: labelWidth }} />
          return (
            <Form.List
              name={name}
              key={formItemProps.key}
              rules={rules.map(v2 => {
                if (isFunction(v2)) {
                  return v2(label)
                }
                return v2
              })}
            >
              {(fields, action, { errors }) => {
                const { add, remove } = action
                return (
                  <Fragment>
                    {fields.map((field, index) => {
                      return (
                        <Form.Item
                          {...omit(formItemProps, ['name'])}
                          key={field.key}
                          label={index === 0 ? formItemProps.label : emptyLabelNode}
                          colon={index === 0}
                        >
                          <Form.Item
                            {...field}
                            rules={formItemProps.rules}
                            validateTrigger={['onChange', 'onBlur']}
                            noStyle
                          >
                            {formItemNode}
                          </Form.Item>
                          <span className={getClassNames('list-operation')}>
                            {fields.length < max && (
                              <Tooltip title="复制此行">
                                <CopyOutlined
                                  onClick={() => {
                                    const formRefNode = this.getFormRefNode()
                                    const value = formRefNode.getFieldValue([name, field.name])
                                    add(value, index + 1)
                                  }}
                                />
                              </Tooltip>
                            )}
                            {fields.length > min && (
                              <Tooltip title="删除此行">
                                <DeleteOutlined
                                  onClick={() => {
                                    remove(field.name)
                                  }}
                                />
                              </Tooltip>
                            )}
                          </span>
                        </Form.Item>
                      )
                    })}
                    <Form.Item key={formItemProps.key} label={emptyLabelNode} colon={false}>
                      <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        disabled={fields.length >= max}
                        onClick={() => {
                          add(record)
                        }}
                        style={{ width: template.width + 48 }}
                      >
                        添加一行数据
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </Fragment>
                )
              }}
            </Form.List>
          )
        }

        return <Form.Item {...formItemProps}>{this.getFormItemNode(v)}</Form.Item>
      })
    if (children) {
      const childrenNode = (
        <Form.Item colon={false} label={<div style={{ width: labelWidth }} />} key="-1">
          {props.children}
        </Form.Item>
      )
      columnsNode.push(childrenNode)
    }
    return columnsNode
  }

  // 查询, 重置
  renderSearchReset = () => {
    const { props, state, onReset } = this
    const { columns } = state
    const { showSearchBtn, showResetBtn, extraConfig } = props
    if (isEveryFalsy(showSearchBtn, showResetBtn)) {
      return null
    }
    let showSearch = showSearchBtn
    let showReset = showResetBtn
    // 只有一项
    if (columns.length === 1) {
      const { template } = columns[0]
      const { tpl, inputType } = template
      // 只有一个输入框
      if (tpl === 'input' && inputType === 'input') {
        showSearch = true
      }
      showReset = false
    }
    const labelWidth = props.labelWidth || getFormItemLabelWidth(columns)

    const { submitText, resetText, submitLabelWidth } = {
      ...defaultExtraConfig,
      ...extraConfig
    }

    return (
      <Form.Item
        colon={false}
        label={
          submitLabelWidth === 0 ? null : (
            <div style={{ width: isNull(submitLabelWidth) ? labelWidth : submitLabelWidth }} />
          )
        }
        className={getClassNames('form-item')}
      >
        {showSearch && (
          <Button type="primary" htmlType="submit" key="submit">
            {submitText}
          </Button>
        )}
        {showReset && (
          <Button onClick={onReset} key="reset">
            {resetText}
          </Button>
        )}
      </Form.Item>
    )
  }

  render() {
    const { props, state, onSearch, renderColumns, renderSearchReset } = this
    const { columns, initialValues } = state
    const { disabled, visibleFilterPanel } = props
    if (isEmptyArray(columns)) {
      return null
    }
    const cardProps = merge({}, defaulCardProps, props.cardProps)
    const formProps = merge({}, defaulFormProps, props.formProps)
    formProps.onFinish = onSearch
    formProps.initialValues = initialValues
    formProps.ref = this.formRef
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
      <Card
        className={classNames(getClassNames(), {
          [getClassNames('disabled')]: disabled,
          [getClassNames('antd-v3')]: isAntdV3
        })}
        {...cardProps}
      >
        <Form {...formProps}>
          {renderColumns()}
          {renderSearchReset()}
        </Form>
        {visibleFilterPanel && (
          <FilterPanel
            ref={this.filterPanelRef}
            columns={columns}
            getFieldsValue={() => {
              const formRefNode = this.getFormRefNode()
              return formRefNode.getFieldsValue()
            }}
            onChange={fields => {
              const formRefNode = this.getFormRefNode()
              formRefNode.setFields(fields)
              this.onSearch()
            }}
          />
        )}
      </Card>
    )
  }
}

Object.entries(BuiltInComponents).forEach(([k, v]) => {
  const name = pascalCase(k)
  Index[name] = v
})

export default Index
