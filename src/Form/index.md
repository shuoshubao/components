## 简介

**做了哪些事情**

- 既可以用来做 **搜索** 组件; 也可以用做 **表单** 组件, 就是这么叼!
  - 默认是 **搜索** 组件
  - 通过配置 **formProps={{ layout: 'horizontal' }}** 即可变成表单组件
- 配置化, 一个表单子组件即一段 json 配置, 通过 _template.tpl_ 来配置哪种组件, 组件其他属性直接透传
- label 宽度的统一, 默认是内部通过文字长度取最大值, 也可直接配置; 解决对不齐的 UI 头疼问题
- 可直接配置 label 的提示 tooltip, 并且可以以字符串的形式来写跳转链接
- 封装了 _value_ 和 _onChange_ 不用再写大量重复的 state 和 events
- input 输入回车自动触发 _onSubmit_ 事件, checkbox, radio select 等其他组件 onChange 时自动触发 _onSubmit_ 事件
- 内置 _debounce_ 优化, 防止因代码原因短时间内触发多次 _onSubmit_ 事件

**内置表单子组件(16 个):**

<table class="custom-table-header-left">
    <colgroup>
        <col width="120px" />
    </colgroup>
    <thead>
        <tr>
            <th>分类</th>
            <th colspan="10">模板</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>输入</td>
            <td>input</td>
            <td>number</td>
            <td>number-range</td>
            <td colspan="3">slider</td>
        </tr>
        <tr>
            <td>枚举</td>
            <td>select</td>
            <td>checkbox</td>
            <td>radio</td>
            <td>cascader</td>
            <td>tree-select</td>
            <td>tabs</td>
        </tr>
        <tr>
            <td>日期/时间</td>
            <td>date-picker</td>
            <td>date-range-picker</td>
            <td>time-picker</td>
            <td colspan="3">time-range-picker</td>
        </tr>
        <tr>
            <td>其他</td>
            <td>rate</td>
            <td colspan="5">auto-complete</td>
        </tr>
    </tbody>
</table>

:::info{title=提示} 当然, 除了以上 16 个内置组件, 你还可以开发自定义组件! :::

## 基本使用

### 搜索组件

```jsx
import React from 'react'
import { Form } from '@nbfe/components'
import { OptionsData } from '../mock'

export default () => {
  const columns = [
    {
      name: 'input',
      label: '输入框'
    },
    {
      name: 'select',
      label: '下拉框',
      template: {
        tpl: 'select',
        allowClear: true,
        options: OptionsData
      }
    }
  ]
  return <Form columns={columns} autoSubmit={false} showSearchBtn />
}
```

### 表单组件

当作为表单组件时, 需要手动把查询和重置按钮隐藏; Form 元素的子元素将被放到表单项的最底部

```jsx
import React, { useRef, useState } from 'react'
import { Form } from '@nbfe/components'
import { Button } from 'antd'
import { rules, sleep } from '@nbfe/tools'
import { showMessage, CityOptionsData } from '../mock'

const { required, selectRequired } = rules

export default () => {
  const formRef = useRef()

  // 表单正在提交
  const [submitLoading, setSubmitLoading] = useState(false)

  // 详情数据
  const detailData = {
    id: 'scafdfea',
    name: '硕鼠宝',
    school: '',
    city: 1
  }

  // 表单提交
  // 1. 表单校验
  // 1.1 如果失败 **formData** 返回null, 且弹窗提示信息: '表单项填写存在错误！请检查'
  // 1.2 校验通过则返回表单数据
  const handleSubmit = async () => {
    const formData = await formRef.current.getFormData()
    console.log(111, formData)
    if (!formData) {
      return
    }
    showMessage('表单数据', formData)
    setSubmitLoading(true)
    // 这里模仿接口请求
    await sleep()
    showMessage('操作成功!')
    setSubmitLoading(false)
  }

  const columns = [
    {
      name: 'id',
      label: 'ID',
      tooltip: '有些数据不可编辑, 配置 [disabled|https://ant.design/components/form-cn/] 字段即可',
      template: {
        disabled: true
      }
    },
    {
      name: 'name',
      label: '姓名',
      rules: [required]
    },
    {
      name: 'city',
      label: '城市',
      rules: [selectRequired],
      template: {
        tpl: 'select',
        allowClear: true,
        options: CityOptionsData
      }
    },
    {
      name: 'school',
      label: '学校',
      rules: [required],
      template: {
        allowClear: true
      }
    }
  ].map(v => {
    return {
      ...v,
      defaultValue: detailData[v.name]
    }
  })
  return (
    <Form
      ref={formRef}
      formProps={{ layout: 'horizontal' }}
      columns={columns}
      autoSubmit={false}
      showSearchBtn={false}
      showResetBtn={false}
    >
      <Button type="primary" loading={submitLoading} onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}
```

## 内置模板

### Input

```jsx
import React from 'react'
import { Form } from '@nbfe/components'
import { showMessage, OptionsData } from '../mock'

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }
  const columns = [
    {
      name: 'input1',
      label: '输入框'
    },
    {
      name: 'input2',
      label: '搜索框',
      template: {
        inputType: 'search'
      }
    },
    {
      name: 'input2___selectKey2',
      label: '下拉框+输入框',
      template: {
        inputType: 'select-input',
        options: OptionsData
      }
    },
    {
      name: 'input3___selectKey3',
      label: '下拉框+搜索框',
      template: {
        inputType: 'select-search',
        options: OptionsData
      }
    },
    {
      name: 'input4',
      label: '文本域',
      tooltip:
        '透传组件 [antd - textarea|https://ant.design/components/input-cn/#components-input-demo-textarea] 的其他属性',
      template: {
        inputType: 'textarea',
        rows: 2
      }
    },
    {
      name: 'input5',
      label: '密码框',
      template: {
        inputType: 'password'
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} showSearchBtn autoSubmit={false} />
}
```

### InputNumber_RangeNumber

```jsx
import React from 'react'
import { Form } from '@nbfe/components'

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }
  const columns = [
    {
      name: 'number-1',
      label: '数字输入框1',
      template: {
        tpl: 'number'
      }
    },
    {
      name: 'number-2',
      label: '数字输入框2',
      template: {
        tpl: 'number',
        min: 0,
        max: 1,
        step: 0.1
      }
    },
    {
      name: 'minValueName,maxValueName',
      label: '数字范围',
      template: {
        tpl: 'number-range',
        min: 0,
        max: 1,
        step: 0.1
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} autoSubmit={false} />
}
```

### Select_Radio_Checkbox_Tabs

tabs 一般独占一行, 且在第一行

```jsx
import React from 'react'
import { Form } from '@nbfe/components'
import { TabsOptionsData, OptionsData, MoreOptionsData } from '../mock'

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }

  const columns = [
    {
      name: 'tabs1',
      defaultValue: 'two',
      inline: false,
      template: {
        tpl: 'tabs',
        options: TabsOptionsData
      }
    },
    {
      name: 'tabs2',
      defaultValue: 'two',
      inline: false,
      template: {
        tpl: 'tabs',
        emitReset: true, // 触发其他子组件的重置
        options: TabsOptionsData
      }
    },
    {
      name: 'select',
      label: '下拉框',
      defaultValue: 2,
      template: {
        tpl: 'select',
        allowClear: true,
        options: OptionsData
      }
    },
    {
      name: 'select2',
      label: '下拉框',
      defaultValue: null,
      tooltip: '下拉框 单选 全部',
      template: {
        tpl: 'select',
        allItem: {
          label: '全部',
          value: null
        },
        options: OptionsData
      }
    },
    {
      name: 'select3',
      label: '下拉框',
      defaultValue: [1],
      tooltip: '下拉框 复选 全选',
      template: {
        tpl: 'select',
        allowClear: true,
        mode: 'multiple',
        allItem: {
          label: '全部'
        },
        options: OptionsData
      }
    },
    {
      name: 'radio',
      label: '单选框',
      defaultValue: 1,
      template: {
        tpl: 'radio',
        options: OptionsData
      }
    },
    {
      name: 'checkbox',
      label: '复选框',
      defaultValue: [1],
      template: {
        tpl: 'checkbox',
        options: OptionsData
      }
    },
    {
      name: 'checkbox2',
      label: '复选框',
      tooltip: '带全选功能',
      defaultValue: [1, 2, 3],
      inline: false,
      template: {
        tpl: 'checkbox',
        indeterminate: true,
        options: MoreOptionsData
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} autoSubmit={false} />
}
```

### DatePicker

日期相关分两种: 单日期(template.tpl: 'date-picker'), 日期范围(template.tpl: 'data-range-picker')

日期范围需要俩字段, 即开始时间和结束时间; 仍然通过一个 **name** 字段来配置, 只需要通过 _,_ 连接就行, 例如 `name: 'startAt,endAt'`

```jsx
import React from 'react'
import { Form } from '@nbfe/components'
import { showMessage, TabsOptionsData, OptionsData } from '../mock'

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }

  const columns = [
    {
      label: '单日期',
      name: 'date-picker',
      template: {
        tpl: 'date-picker'
      }
    },
    {
      label: '日期范围',
      name: 'startTime1,endTime1',
      template: {
        tpl: 'date-range-picker'
      }
    },
    {
      label: '日期范围',
      name: 'startTime2,endTime2',
      template: {
        tpl: 'date-range-picker',
        format: 'YYYY-MM-DD'
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} autoSubmit={false} />
}
```

### Cascader_AutoComplete_TreeSelect

Select Cascader TreeSelect AutoComplete 这四个组件其实本质上都属于下拉框, 用法也比较类似, 当数据源是写死时, 用法和 antd 的用法一样, 数据源通过 **options** 或 **treeData** 字段来传入.

但是实际工作中很多情况(特别是 Cascader, TreeSelect, AutoComplete)都是从后端接口来获取的; 如果像 antd 原生的那样使用, 就需要存 很多 options, 然后等接口请求完再更新每个 options, 重复且麻烦!

针对这类 case, 本组件设计了 **remoteConfig** 概念! 即用一段配置来描述接口请求

```jsx
import React from 'react'
import { version } from 'antd'
import { sleep } from '@nbfe/tools'
import { Form } from '@nbfe/components'
import { showMessage, CascaderOptions, TreeData } from '../mock'

const mockEmailData = str => {
  return [1, 2, 3].map(v => {
    const name = [str, v].join('')
    return {
      value: name,
      label: `${name}(${name}@qq.com)`
    }
  })
}

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }
  const columns = [
    {
      label: '级联选择',
      name: 'cascader',
      template: {
        tpl: 'cascader',
        remoteConfig: {
          fetch: async () => {
            await sleep()
            // 完整的接口数据
            return {
              code: 0,
              data: {
                cityData: CascaderOptions
              },
              mesg: 'success'
            }
          },
          path: 'data.cityData'
        }
      }
    },
    {
      name: 'tree-select',
      label: '树选择',
      template: {
        tpl: 'tree-select',
        remoteConfig: {
          fetch: async () => {
            await sleep()
            return TreeData
          }
        }
      }
    },
    {
      name: 'auto-complete',
      label: '自动完成',
      template: {
        tpl: 'auto-complete',
        remoteConfig: {
          fetch: async query => {
            // 这里是为了模拟接口请求, 实际上, 你可使用任意 Promise
            await sleep(0.1)
            return !query ? [] : mockEmailData(query)
          }
        }
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} autoSubmit={false} />
}
```

### Slider_Switch

```jsx
import React from 'react'
import { version } from 'antd'
import { sleep } from '@nbfe/tools'
import { Form } from '@nbfe/components'
import { showMessage } from '../mock'

export default () => {
  const handleSubmit = params => {
    showMessage('触发了提交事件, 参数为:', params)
  }
  const columns = [
    {
      label: '滑动输入条1',
      name: 'slider1',
      defaultValue: 0,
      template: {
        tpl: 'slider'
      }
    },
    {
      label: '开关',
      name: 'switch',
      defaultValue: false,
      template: {
        tpl: 'switch'
      }
    }
  ]
  return <Form columns={columns} onSubmit={handleSubmit} autoSubmit={false} />
}
```

## 自定义组件

只需要给 **template: tpl** 传入一个 [受控组件](https://zh-hans.reactjs.org/docs/forms.html#controlled-components)

```jsx
import React, { useRef, useState } from 'react'
import { Button, Input } from 'antd'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined'
import { map, cloneDeep } from 'lodash'
import { isUniq } from '@nbfe/tools'
import { Form } from '@nbfe/components'
import { showMessage } from '../mock'

// 自定义组件
const CustomComponent = props => {
  const { value = [], onChange, min = 1, max = 5 } = props

  const onAdd = i => {
    const newValue = cloneDeep(value)
    newValue.splice(i + 1, 0, '')
    onChange(newValue)
  }

  const onRemove = i => {
    const newValue = cloneDeep(value)
    newValue.splice(i, 1)
    onChange(newValue)
  }

  return (
    <div>
      {value.map((v, i) => {
        return (
          <div key={[i].join()} style={{ marginTop: i === 0 ? 0 : 10, width: 280 }}>
            <Input
              value={v}
              onChange={e => {
                const newValue = cloneDeep(value)
                newValue[i] = e.target.value
                onChange(newValue)
              }}
              style={{ width: 200 }}
            />
            {value.length < max && (
              <PlusCircleOutlined
                onClick={() => {
                  onAdd(i)
                }}
                style={{ marginLeft: 10, fontSize: 20, color: '#1890ff' }}
              />
            )}
            {value.length > min && (
              <MinusCircleOutlined
                onClick={() => {
                  onRemove(i)
                }}
                style={{ marginLeft: 10, fontSize: 20, color: '#f5222d' }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default () => {
  const formRef = useRef()
  const handleSubmit = async () => {
    const formData = await formRef.current.getFormData()
    if (!formData) {
      return
    }
    showMessage('表单数据', formData)
  }
  const columns = [
    {
      label: '自定义组件',
      name: 'a',
      defaultValue: ['aa', 'bb', 'cc'],
      rules: [
        {
          validator: (rule, value) => {
            const label = '自定义组件'
            const val = value.map(v => {
              return v.trim()
            })
            // 空项
            if (val.some(v => v === '')) {
              return Promise.reject([label, '不能有空项'].join(''))
            }
            // 重复项
            if (!isUniq(val)) {
              return Promise.reject([label, '不能有重复项'].join(''))
            }
            return Promise.resolve()
          }
        }
      ],
      template: {
        tpl: CustomComponent
      }
    }
  ]
  return (
    <Form
      ref={formRef}
      columns={columns}
      autoSubmit={false}
      showSearchBtn={false}
      showResetBtn={false}
      formProps={{ layout: 'horizontal' }}
    >
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}
```

## 动态增减表单项

配置 _column.formListConfig_ 即可

```jsx
import React, { useRef } from 'react'
import { Button, Input, Space } from 'antd'
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined'
import MinusCircleOutlined from '@ant-design/icons/MinusCircleOutlined'
import { isUniq } from '@nbfe/tools'
import { Form } from '@nbfe/components'
import { showMessage } from '../mock'

const isUniqCollection = collection => {
  return isUniq(collection.map(v => Object.entries(v).flat().join('__')))
}

const PersonInfo = props => {
  const { value, onChange } = props
  return (
    <Space>
      <span>姓:</span>
      <Input
        value={value.first}
        onChange={e => {
          onChange({
            ...value,
            first: e.target.value
          })
        }}
        placeholder="请输入姓"
      />
      <span>名:</span>
      <Input
        value={value.last}
        onChange={e => {
          onChange({
            ...value,
            last: e.target.value
          })
        }}
        placeholder="请输入名"
      />
    </Space>
  )
}

export default () => {
  const formRef = useRef()

  const handleSubmit = async () => {
    const formData = await formRef.current.getFormData()
    if (!formData) {
      return
    }
    showMessage('表单数据', formData)
  }

  const columns = [
    {
      label: '用户列表',
      name: 'users',
      defaultValue: [
        {
          first: '方',
          last: '涛'
        }
      ],
      formListConfig: {
        record: {
          first: '',
          last: ''
        },
        rules: [
          {
            validator: (rule, value) => {
              console.log(222)
              console.log(value)
              console.log(rule)
              if (!isUniqCollection(value)) {
                return Promise.reject(new Error('不得重复'))
              }
              return Promise.resolve()
            }
          }
        ]
      },
      template: {
        tpl: PersonInfo
      }
    }
  ]
  return (
    <Form
      ref={formRef}
      columns={columns}
      autoSubmit={false}
      showSearchBtn={false}
      showResetBtn={false}
      formProps={{ layout: 'horizontal' }}
    >
      <Button type="primary" onClick={handleSubmit}>
        提交
      </Button>
    </Form>
  )
}
```

## API

```jsx
import React from 'react'
import api from './api.json'
import ComponentApi from '../ComponentApi'

export default () => {
  return <ComponentApi api={api} />
}
```
