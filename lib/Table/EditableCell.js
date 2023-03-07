import React, { useContext, useRef, useEffect } from 'react'
import { Form, Input } from 'antd'
import { useDrag, useDrop } from 'react-dnd'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { get, find, omit, flatten, isFunction } from 'lodash'
import moment from 'moment'
import { isEveryTruthy } from '@nbfe/tools'
import BuiltInComponents from '../Form/components'
import { getComponentName, getClassNames } from './config'

const EditableContext = React.createContext(null)

const SortableItem = SortableElement(props => {
  return <tr {...props} />
})

const DragType = getComponentName('DraggableBodyRow')

const getTabeTrNode = trNode => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>{trNode}</EditableContext.Provider>
    </Form>
  )
}

const EditableDraggableRow = props => {
  const { record, index, handleMoveRow, rowDraggable, cellDraggable, disabledSort, className, style } = props
  const resetProps = omit(props, ['record', 'handleMoveRow', 'rowDraggable', 'cellDraggable', 'disabledSort'])
  // 拖拽-整行
  if (rowDraggable) {
    // 禁止拖拽
    const disabled = isFunction(disabledSort) ? disabledSort(record, index) : false
    if (disabled) {
      return getTabeTrNode(<tr {...resetProps} />)
    }
    const dragRef = useRef()
    const [{ isOver, dropClassName }, drop] = useDrop({
      accept: DragType,
      collect: monitor => {
        const { index: dragIndex } = monitor.getItem() || {}
        if (dragIndex === index) {
          return {}
        }
        return {
          isOver: monitor.isOver(),
          dropClassName: getClassNames(dragIndex < index ? 'drop-over-downward' : 'drop-over-upward')
        }
      },
      drop: item => {
        handleMoveRow(item.index, index)
      }
    })
    const [, drag] = useDrag({
      type: DragType,
      item: {
        index
      },
      collect: monitor => {
        return {
          isDragging: monitor.isDragging()
        }
      }
    })
    drop(drag(dragRef))
    return getTabeTrNode(
      <tr
        ref={dragRef}
        className={`${className} ${isOver ? dropClassName : ''}`}
        {...resetProps}
        style={{ ...style, cursor: 'move' }}
      />
    )
  }

  // 拖拽-单元格
  if (cellDraggable) {
    return getTabeTrNode(<SortableItem index={index} {...resetProps} />)
  }

  return getTabeTrNode(<tr {...resetProps} />)
}

const getEditableCell = ({ size, columns }) => {
  return props => {
    const { editable, children, index, dataIndex, record, rules, handleEditRow } = props
    const restProps = omit(props, ['editable', 'children', 'index', 'dataIndex', 'record', 'rules', 'handleEditRow'])
    if (!record) {
      return <td {...restProps}>{children}</td>
    }
    const form = useContext(EditableContext)
    const computedRules = flatten([rules]).filter(Boolean)
    let value = get(record, dataIndex)

    useEffect(() => {
      form.setFieldsValue({ [dataIndex]: value })
    })

    const save = async () => {
      try {
        const values = await form.validateFields()
        const tempValue = get(values, dataIndex)
        handleEditRow({ index, dataIndex, value: tempValue })
      } catch (errInfo) {
        // eslint-disable-next-line no-console
        console.error('保存失败:', errInfo)
      }
    }

    let childNode = children

    if (editable) {
      const column = find(columns, { dataIndex })
      const { template } = column
      const { tpl } = template
      let FormItemNode
      const FormItemNodeProps = {
        onChange: save,
        size,
        style: { width: '100%' }
      }

      Object.assign(FormItemNodeProps, omit(template, ['emptyText']))

      // 内置组件
      if (Object.keys(BuiltInComponents).includes(tpl)) {
        let BuiltInComponent = BuiltInComponents[tpl]
        if (tpl === 'input') {
          BuiltInComponent = Input
          delete FormItemNodeProps.onChange
          FormItemNodeProps.onPressEnter = save
          FormItemNodeProps.onBlur = save
          FormItemNodeProps.inputWidth = '100%'
        }
        if (tpl === 'number-range') {
          const [key1, key2] = dataIndex.split(',')
          if (isEveryTruthy(get(record, key1), get(record, key2))) {
            value = [get(record, key1), get(record, key2)]
          } else {
            value = []
          }
        }
        if (tpl === 'date-picker' && value) {
          value = moment(value)
        }
        if (tpl === 'date-range-picker') {
          const [key1, key2] = dataIndex.split(',')
          if (isEveryTruthy(get(record, key1), get(record, key2))) {
            value = [moment(get(record, key1)), moment(get(record, key2))]
          }
        }
        if (tpl === 'time-picker') {
          const { format = 'HH:mm:ss' } = template
          if (value) {
            value = moment(value, format)
          }
        }
        if (tpl === 'time-range-picker') {
          const { format = 'HH:mm:ss' } = template
          const [key1, key2] = dataIndex.split(',')
          if (isEveryTruthy(get(record, key1), get(record, key2))) {
            value = [moment(get(record, key1), format), moment(get(record, key2), format)]
          }
        }

        FormItemNode = <BuiltInComponent {...FormItemNodeProps} />
      }

      childNode = (
        <Form.Item noStyle name={dataIndex} initialValue={value} rules={computedRules}>
          {FormItemNode}
        </Form.Item>
      )
    }

    return <td {...restProps}>{childNode}</td>
  }
}

const SortableBody = SortableContainer(props => {
  return <tbody {...props} />
})

const getDraggableContainer = handleMoveRow => {
  return props => {
    return (
      <SortableBody
        useDragHandle
        disableAutoscroll
        helperClass={getClassNames('row-dragging')}
        onSortEnd={({ oldIndex, newIndex }) => {
          handleMoveRow(oldIndex, newIndex)
        }}
        {...props}
      />
    )
  }
}

export default config => {
  const { size, columns, cellDraggable, handleMoveRow } = config
  const components = {
    body: {
      row: EditableDraggableRow,
      cell: getEditableCell({ size, columns })
    }
  }
  if (cellDraggable) {
    components.body.wrapper = getDraggableContainer(handleMoveRow)
  }
  return components
}
