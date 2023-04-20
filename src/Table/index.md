---
toc: content
order: 1
---

## 简介

- 集成接口请求
- 集成分页功能
- 内置丰富模板
- 可编辑单元格
- 拖拽排序\_整行
- 拖拽排序\_句柄

## 基本使用

### 同步据源

当不使用接口请求时, 数据源通过 **dataSource** 属性传入

```jsx
import React from 'react'
import { Table } from '@nbfe/components'

const dataSource = [
  {
    id: 1,
    name: 'aaa'
  },
  {
    id: 2,
    name: 'bbb'
  }
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  }
]

export default () => {
  return <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" />
}
```

### 异步数据

当数据不是固定的, 比如 1. 有搜索; 2. 分页时需请求接口, 这时候不配置属性 **dataSource**, 而只需配置属性 **remoteConfig**, 然后在需要的地方调用 tableRef.current.search() 即可

```jsx
import React, { useRef } from 'react'
import { Button } from 'antd'
import { sleep } from '@nbfe/tools'
import { Table } from '@nbfe/components'

const dataSource = [
  {
    id: 1,
    name: 'aaa'
  },
  {
    id: 2,
    name: 'bbb'
  }
]

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  }
]

const remoteConfig = {
  fetch: async () => {
    await sleep() // 这里是为了模拟接口
    return {
      data: {
        list: dataSource,
        total: dataSource.length
      },
      code: 0,
      message: '成功'
    }
  },
  dataSourceKey: 'data.list',
  totalKey: 'data.total'
}

export default () => {
  const tableRef = useRef()

  const handleSearch = () => {
    tableRef.current.search()
  }

  return (
    <>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <Table ref={tableRef} rowKey="id" columns={columns} size="small" remoteConfig={remoteConfig} />
    </>
  )
}
```

## 内置模板

除了以下列举的模板外, 还支持 Form 组件所有的模板, 这里就不赘述, 详见: [编辑](#编辑)

<table class="custom-table-header-left">
  <colgroup><col width="80px" /></colgroup>
  <thead>
  <tr>
    <th></th>
    <th colspan="7">展示类</th>
    <th colspan="2">操作</th>
    <th colspan="4">数字类</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>tpl</td>
    <td>numbering</td>
    <td>text</td>
    <td>image</td>
    <td>enum</td>
    <td>date</td>
    <td>code</td>
    <td>avatar</td>
    <td>sort</td>
    <td>link</td>
    <td>digit</td>
    <td>percent</td>
    <td>rate</td>
    <td>progress</td>
  </tr>
  <tr>
    <td>含义</td>
    <td>序号</td>
    <td>文本</td>
    <td>缩略图</td>
    <td>枚举</td>
    <td>日期</td>
    <td>代码</td>
    <td>头像</td>
    <td>排序</td>
    <td>按钮组</td>
    <td>数字</td>
    <td>百分比</td>
    <td>评分</td>
    <td>进度条</td>
  </tr>
  </tbody>
</table>

### 展示类

```jsx
import React from 'react'
import { Typography } from 'antd'
import { Table } from '@nbfe/components'
import { OptionsData2 } from '../mock'

const columns1 = [
  {
    title: '序号',
    template: {
      tpl: 'numbering'
    }
  },
  {
    title: '缩略图',
    dataIndex: 'imgUrl',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '文本',
    dataIndex: 'desc',
    tooltip: '当值是空值时, 默认展示 --'
  },
  {
    title: '文本-空值',
    dataIndex: 'textEmpty',
    tooltip: '当值是空值时, 默认展示 --'
  },
  {
    title: '文本-空值2',
    dataIndex: 'textEmpty2',
    tooltip: '可自定义空值时的展示',
    template: {
      emptyText: '无'
    }
  },
  {
    title: '文本-数组',
    dataIndex: 'textArray',
    tooltip: 'separator 配置 分割符',
    template: {
      separator: '、'
    }
  },
  {
    title: '文本-数组',
    dataIndex: 'textArray',
    tooltip: '当 separator: "div" 时, 换行',
    template: {
      separator: 'div'
    }
  },
  {
    title: '日期',
    dataIndex: 'createAt',
    tooltip: '不管后端返回的是字符串还是时间戳, 都进行日期格式化操作',
    template: {
      tpl: 'date'
    }
  },
  {
    title: '日期2',
    dataIndex: 'createAt',
    tooltip: 'format: YYYY-MM-DD hh:mm:ss',
    template: {
      tpl: 'date',
      format: 'YYYY-MM-DD hh:mm:ss'
    }
  }
]

const columns2 = [
  {
    title: '头像',
    dataIndex: 'avatar1',
    template: {
      tpl: 'avatar'
    }
  },
  {
    title: '头像组',
    dataIndex: 'avatar2',
    template: {
      tpl: 'avatar',
      maxCount: 2
    }
  },
  {
    title: '代码',
    dataIndex: 'code1',
    template: {
      tpl: 'code'
    }
  },
  {
    title: '代码2',
    dataIndex: 'code2',
    tooltip: 'language: "json"',
    template: {
      tpl: 'code',
      language: 'json'
    }
  }
]

const columns3 = [
  {
    title: '枚举1',
    dataIndex: 'enum',
    width: 100,
    template: {
      tpl: 'enum',
      options: OptionsData2
    }
  },
  {
    title: '枚举2',
    dataIndex: 'enum',
    width: 100,
    tooltip: 'shape: "dot" // 小圆点',
    template: {
      tpl: 'enum',
      shape: 'dot',
      options: OptionsData2
    }
  },
  {
    title: '枚举3',
    dataIndex: 'enum',
    width: 100,
    tooltip: 'shape: "square" // 小方块',
    template: {
      tpl: 'enum',
      shape: 'square',
      options: OptionsData2
    }
  },
  {
    title: '枚举4',
    dataIndex: 'enum',
    width: 100,
    tooltip: 'shape: "tag" // antd tag',
    template: {
      tpl: 'enum',
      shape: 'tag',
      options: OptionsData2
    }
  },
  {
    title: '枚举5',
    dataIndex: 'enum',
    width: 100,
    tooltip: 'shape: "circle" // 圆圈',
    template: {
      tpl: 'enum',
      shape: 'circle',
      options: OptionsData2
    }
  }
]

const dataSource = [
  {
    id: 1,
    desc: 'aaa',
    imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    avatar1: 'https://api.multiavatar.com/1.svg',
    avatar2: ['https://api.multiavatar.com/12.svg', 'https://api.multiavatar.com/13.svg'],
    textEmpty: 'aaa',
    textEmpty2: '',
    textArray: ['aaa', 'bbb'],
    createAt: '2021-12-01 13:02:13',
    code1: '',
    code2: null,
    enum: 3
  },
  {
    id: 2,
    desc: 'bbb',
    imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    avatar1: 'https://api.multiavatar.com/2.svg',
    avatar2: ['https://api.multiavatar.com/22.svg', 'https://api.multiavatar.com/23.svg'],
    textEmpty: '',
    textEmpty2: 'bbb',
    textArray: ['aaa', 'bbb'],
    createAt: '2021-11-20 13:02:13',
    code1: null,
    code2: { a: 1 },
    enum: 1
  },
  {
    id: 3,
    desc: 'ccc',
    imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    avatar1: 'https://api.multiavatar.com/3.svg',
    avatar2: [],
    textEmpty: '',
    textEmpty2: 'bbb',
    textArray: ['aaa', 'bbb'],
    createAt: '2021-11-11 11:11:11',
    code1: 'import { Table } from "@nbfe/components";',
    code2: {},
    enum: 2
  },
  {
    id: 4,
    desc: 'ddd',
    imgUrl: '',
    avatar1: '',
    avatar2: [
      'https://api.multiavatar.com/42.svg',
      'https://api.multiavatar.com/43.svg',
      'https://api.multiavatar.com/45.svg'
    ],
    textEmpty: '',
    textEmpty2: 'bbb',
    textArray: ['aaa', 'bbb'],
    createAt: '2021-11-11 11:11:11',
    code1: 'import { Form } from "@nbfe/components";',
    code2: { a: 1, b: [1, 2] },
    enum: null
  }
]

export default () => {
  return (
    <>
      <Table rowKey="id" columns={columns1} dataSource={dataSource} pagination={false} />
      <Table rowKey="id" columns={columns2} dataSource={dataSource} pagination={false} />
      <Typography.Title level={4}>枚举</Typography.Title>
      <Table rowKey="id" columns={columns3} dataSource={dataSource} pagination={false} />
    </>
  )
}
```

### 操作

```jsx
import React from 'react'
import { message } from 'antd'
import { sleep } from '@nbfe/tools'
import { Table } from '@nbfe/components'

const dataSource = [
  {
    id: 1,
    status: 'online'
  },
  {
    id: 2,
    status: 'offline'
  }
]

const columns = [
  {
    title: '排序',
    width: 50,
    template: {
      tpl: 'sort'
    }
  },
  {
    title: '链接',
    tooltip: 'href: 路径; query: 额外参数; 其他Button的属性透传',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        const { status } = record
        return [
          {
            text: '链接1',
            href: 'https://www.baidu.com',
            query: {
              a: 1,
              b: 2
            },
            target: '_blank'
          },
          {
            text: '链接2',
            href: 'https://www.baidu.com',
            tooltip: status === 'online' ? '别问, 问就是不能点击' : '',
            disabled: status === 'online'
          }
        ]
      }
    }
  },
  {
    title: '加事件',
    tooltip: 'onClick',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '百度',
            onClick: () => {
              message.success('可以写任意事件')
            }
          }
        ]
      }
    }
  },
  {
    title: '可见性',
    tooltip: 'visible: true|false',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        const { status } = record
        return [
          {
            text: '上线',
            visible: status === 'offline'
          },
          {
            text: '下线',
            visible: status === 'online'
          }
        ]
      }
    }
  },
  {
    title: '弱提醒',
    tooltip: 'Popconfirm',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        const { status } = record
        const isOnline = status === 'online'
        const text2 = isOnline ? '下线' : '上线'
        return [
          {
            text: text2,
            PopconfirmConfig: {
              title: `确认要${text2}么?`,
              onConfirm: async () => {
                // 这里写异步代码, 异步执行完成之后, 组件将自动触发重新请求数据
                await sleep()
              }
            }
          }
        ]
      }
    }
  },
  {
    title: '强提醒',
    tooltip: 'Modal.confirm',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        const { status } = record
        const isOnline = status === 'online'
        const text2 = isOnline ? '下线' : '上线'
        return [
          {
            text: text2,
            danger: true,
            ModalConfirmConfig: {
              title: `确认要${text2}么?`,
              content: '操作不可逆, 请仔细确认哦~',
              onOk: async () => {
                // 这里写异步代码, 异步执行完成之后, 组件将自动触发重新请求数据
                await sleep()
              }
            }
          }
        ]
      }
    }
  },
  {
    title: '更多',
    tooltip: 'isMore: true 展示在下拉框里',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '按钮1'
          },
          {
            text: '按钮2'
          },
          {
            text: '按钮3'
          },
          {
            text: '按钮4',
            isMore: true
          },
          {
            text: '按钮5',
            isMore: true
          }
        ]
      }
    }
  }
]

export default () => {
  return (
    <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 1000 }} />
  )
}
```

### 数字类

```jsx
import React from 'react'
import { Table } from '@nbfe/components'

const dataSource = [
  { id: 1, digit: null, percent: null, rate: null, progress: null },
  { id: 2, digit: 1234, percent: 12.34, rate: 4, progress: 75 }
]

const columns = [
  {
    title: '千分位',
    dataIndex: 'digit',
    tooltip: 'tpl: "digit"',
    template: {
      tpl: 'digit'
    }
  },
  {
    title: '百分比',
    dataIndex: 'percent',
    tooltip: 'tpl: "percent"',
    template: {
      tpl: 'percent'
    }
  },
  {
    title: '评分',
    dataIndex: 'rate',
    tooltip: 'tpl: "rate"',
    template: {
      tpl: 'rate'
    }
  },
  {
    title: '进度条',
    dataIndex: 'progress',
    tooltip: 'tpl: "progress"',
    template: {
      tpl: 'progress'
    }
  }
]

export default () => {
  return (
    <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 1000 }} />
  )
}
```

## 自定义模板

直接和 antd-table 一样传入 render(text, record, index) 函数即可。

~~当业务中存在相似的模板时, 请封装对应的 render 函数即可, 千万别大量复制粘贴\~)~~

## 编辑

- `column.editable = true`
- `column.template.tpl = 'input' | 'select' ...` (全部模板参考 [内置表单组件](/components/form))

### 异步数据

```jsx
import React, { useRef, useEffect } from 'react'
import { Table } from '@nbfe/components'
import { sleep } from '@nbfe/tools'
import { showMessage, OptionsData3 } from '../mock'

const dataSource = [
  { id: 1, name: 'Tom', sex: 1, age: 3, birth: '2019-01-01', studyStart: '2010-09-01', studyEnd: '2014-07-01' },
  { id: 2, name: 'Jerry', sex: 2, age: 5, birth: '2017-02-23', studyStart: '2017-09-01', studyEnd: '2010-07-01' }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    editable: true,
    width: 200,
    template: {
      tpl: 'input'
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    editable: true,
    template: {
      tpl: 'select',
      options: OptionsData3
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    editable: true,
    template: {
      tpl: 'number'
    }
  },
  {
    title: '生日',
    dataIndex: 'birth',
    editable: true,
    width: 150,
    template: {
      tpl: 'date-picker'
    }
  },
  {
    title: '就读时间',
    dataIndex: 'studyStart,studyEnd',
    editable: true,
    width: 260,
    template: {
      tpl: 'date-range-picker'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const tableRef = useRef()

  useEffect(() => {
    tableRef.current.search()
  }, [tableRef])

  return (
    <Table
      ref={tableRef}
      rowKey="id"
      columns={columns}
      remoteConfig={{
        fetch: async () => {
          return {
            list: dataSource
          }
        }
      }}
      pagination={false}
    />
  )
}
```

### 同步数据

需配置 `onEditableCellSave` 来同步更新数据源

```jsx
import React, { useRef, useState, useEffect } from 'react'
import { Table } from '@nbfe/components'
import { sleep } from '@nbfe/tools'
import { showMessage, OptionsData3 } from '../mock'

const initDataSource = [
  { id: 1, name: 'Tom', sex: 1, age: 3, birth: '2019-01-01', studyStart: '2010-09-01', studyEnd: '2014-07-01' },
  { id: 2, name: 'Jerry', sex: 2, age: 5, birth: '2017-02-23', studyStart: '2017-09-01', studyEnd: '2010-07-01' }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    editable: true,
    width: 200,
    template: {
      tpl: 'input'
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    editable: true,
    template: {
      tpl: 'select',
      options: OptionsData3
    }
  },
  {
    title: '年龄',
    dataIndex: 'age',
    editable: true,
    template: {
      tpl: 'number'
    }
  },
  {
    title: '生日',
    dataIndex: 'birth',
    editable: true,
    width: 150,
    template: {
      tpl: 'date-picker'
    }
  },
  {
    title: '就读时间',
    dataIndex: 'studyStart,studyEnd',
    editable: true,
    width: 260,
    template: {
      tpl: 'date-range-picker'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const tableRef = useRef()

  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(initDataSource)
  }, [setDataSource])

  return (
    <Table
      ref={tableRef}
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      onEditableCellSave={async ({ index, dataIndex, value, dataSource }) => {
        console.log(index, dataIndex, value)
        await sleep()
        setDataSource(dataSource)
      }}
      pagination={false}
    />
  )
}
```

## 拖拽排序

跟拖拽排序有关的配置

- 拖拽整行
  - draggable: true
  - extraConfig?.disabledSort: (record, index) => boolean
- 拖拽句柄
  - template.tpl: 'sort'
  - template.handler: ReactNode
  - template?.disabledSort: (record, index) => boolean
- onDragSortEnd 拖拽排序完成回调

**disabledSort** 默认为 null, 当为函数时, 返回布尔值, 决定该行是否禁用拖拽排序

### 拖拽整行排序

#### 同步数据

需配置 `onDragSortEnd` 来同步更新数据源

```jsx
import React, { useState, useEffect } from 'react'
import { Table } from '@nbfe/components'
import { showMessage, OptionsData3 } from '../mock'

const initData = [
  { id: 1, name: 'Tom', sex: 1 },
  { id: 2, name: 'Jerry', sex: 2 },
  { id: 3, name: 'Herry', sex: 1 }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    template: {
      tpl: 'enum',
      options: OptionsData3,
      shape: 'dot'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(initData)
  }, [setDataSource])

  return (
    <Table
      rowKey="id"
      draggable
      columns={columns}
      dataSource={dataSource}
      onDragSortEnd={({ dataSource, fromIndex, toIndex }) => {
        console.log('拖拽更新后的数据')
        console.log('fromIndex:', fromIndex, ', toIndex:', toIndex)
        console.log(dataSource)
        setDataSource(dataSource)
      }}
      pagination={false}
    />
  )
}
```

#### 异步数据

```jsx
import React, { useRef, useEffect } from 'react'
import { Button } from 'antd'
import { Table } from '@nbfe/components'
import { showMessage, OptionsData3 } from '../mock'

const dataSource = [
  { id: 1, name: 'Tom', sex: 1 },
  { id: 2, name: 'Jerry', sex: 2 },
  { id: 3, name: 'Herry', sex: 1 }
]

const columns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    template: {
      tpl: 'enum',
      options: OptionsData3,
      shape: 'dot'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const tableRef = useRef()

  const handleSearch = () => {
    tableRef.current.search()
  }

  return (
    <>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <Table
        ref={tableRef}
        rowKey="id"
        draggable
        columns={columns}
        remoteConfig={{
          fetch: async () => {
            return {
              list: dataSource
            }
          }
        }}
        pagination={false}
      />
    </>
  )
}
```

### 拖拽手柄列

如果你想换个图标, 配置 **{ tpl: 'sort', icon: ReactNode }** 即可

```jsx
import React, { useState, useEffect } from 'react'
import { Table } from '@nbfe/components'
import { showMessage, OptionsData3 } from '../mock'

const initData = [
  { id: 1, name: 'Tom', sex: 1 },
  { id: 2, name: 'Jerry', sex: 2 },
  { id: 3, name: 'Herry', sex: 1 }
]

const columns = [
  {
    title: '排序',
    width: 50,
    template: {
      tpl: 'sort'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    title: '性别',
    dataIndex: 'sex',
    template: {
      tpl: 'enum',
      options: OptionsData3,
      shape: 'dot'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setDataSource(initData)
  }, setDataSource)

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      onDragSortEnd={({ dataSource }) => {
        console.log('拖拽更新后的数据')
        console.log(dataSource)
        setDataSource(dataSource)
      }}
      pagination={false}
    />
  )
}
```

### 拖拽排序+编辑

拖拽排序 + 编辑 + 远端数据 + 分页

```jsx
import React, { useRef, useEffect } from 'react'
import { Table } from '@nbfe/components'
import { showMessage, OptionsData3, getRemoteTableData } from '../mock'

const columns = [
  {
    title: '排序',
    width: 50,
    template: {
      tpl: 'sort'
    }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    editable: true,
    template: {
      tpl: 'input'
    }
  },
  {
    title: '性别',
    dataIndex: 'sex',
    editable: true,
    template: {
      tpl: 'select',
      options: OptionsData3
    }
  },
  {
    title: '生日',
    dataIndex: 'birth',
    editable: true,
    template: {
      tpl: 'date-picker'
    }
  },
  {
    title: '就读时间',
    dataIndex: 'studyStart,studyEnd',
    editable: true,
    width: 260,
    template: {
      tpl: 'date-range-picker'
    }
  },
  {
    title: '操作',
    template: {
      tpl: 'link',
      render: (text, record, index) => {
        return [
          {
            text: '保存',
            onClick: () => {
              showMessage('当前行的数据', record)
            }
          }
        ]
      }
    }
  }
]

export default () => {
  const tableRef = useRef()

  useEffect(() => {
    tableRef.current.search()
  }, [tableRef])

  return (
    <Table
      rowKey="id"
      ref={tableRef}
      columns={columns}
      remoteConfig={{
        fetch: async params => {
          return getRemoteTableData(params)
        }
      }}
      pagination={{
        defaultPageSize: 3
      }}
    />
  )
}
```

## 工具栏

- `extraConfig.showTotal = true` // 在左上角展示总条数
- `extraConfig.showFullScreen = true` // 展示按钮: 全屏
- `extraConfig.showColumnsSetting = true` // 展示按钮: 表头设置
- `extraConfig.showViewMode = true` // 展示按钮: 切换视图
- `extraConfig.storageKey = 'uniqId'` // 如果一个页面有多个表格需要[表头设置、切换视图]功能, 请确保 key 不同, 用以存储各个表格的状态

### 同步数据

```jsx
import React from 'react'
import { Table } from '@nbfe/components'
import { dataSource } from '../mock'

const columns = [
  {
    title: 'Icon',
    dataIndex: 'image',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '主页',
    dataIndex: 'homepage'
  },
  {
    title: '简介',
    dataIndex: 'desc'
  }
]

export default () => {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      extraConfig={{
        showFullScreen: true,
        showColumnsSetting: true,
        showViewMode: true,
        storageKey: 'one'
      }}
      renderItem={(item, index) => {
        const { name, image, homepage, desc } = item
        return {
          actions: [
            {
              text: '主页',
              href: homepage
            },
            <a href="https://baidu.com" target="_blank" rel="noopener noreferrer" key="link">
              百度
            </a>
          ],
          meta: {
            avatar: image,
            title: name,
            description: desc
          }
        }
      }}
    />
  )
}
```

卡片视图

```jsx
import React from 'react'
import { Table } from '@nbfe/components'
import { Typography, Avatar, Card } from 'antd'
import { dataSource } from '../mock'

const { Link } = Typography

const columns = [
  {
    title: 'Icon',
    dataIndex: 'image',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '主页',
    dataIndex: 'homepage'
  },
  {
    title: '简介',
    dataIndex: 'desc'
  }
]

const renderItem = (item, index) => {
  const { name, image, homepage, desc } = item
  return (
    <Card
      title={<Link src={homepage}>{name}</Link>}
      extra={<Avatar src={image} />}
      size="small"
      bodyStyle={{ height: 100, maxHeight: 100, overflowY: 'auto' }}
    >
      {desc}
    </Card>
  )
}

export default () => {
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={{
        defaultPageSize: 8
      }}
      extraConfig={{
        showFullScreen: true,
        showColumnsSetting: true,
        showViewMode: true,
        storageKey: 'one',
        listViewText: '卡片'
      }}
      renderItem={renderItem}
      listProps={{ grid: { gutter: 16, column: 4 } }}
    />
  )
}
```

### 异步数据

```jsx
import React, { useRef } from 'react'
import { Table } from '@nbfe/components'
import { Button } from 'antd'
import { getRemoteTableData } from '../mock'

const columns = [
  {
    title: 'Icon',
    dataIndex: 'image',
    template: {
      tpl: 'image'
    }
  },
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '主页',
    dataIndex: 'homepage'
  },
  {
    title: '简介',
    dataIndex: 'desc'
  }
]

const renderItem = (item, index) => {
  const { name, image, homepage, desc } = item
  return {
    actions: [
      {
        text: '主页',
        href: homepage
      },
      <a href="https://baidu.com" target="_blank" rel="noopener noreferrer" key="link">
        百度
      </a>
    ],
    meta: {
      avatar: image,
      title: name,
      description: desc
    }
  }
}

export default () => {
  const tableRef = useRef()

  const handleSearch = () => {
    tableRef.current.search()
  }

  return (
    <>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <Table
        ref={tableRef}
        rowKey="id"
        columns={columns}
        remoteConfig={{
          fetch: getRemoteTableData
        }}
        pagination={{
          defaultPageSize: 8
        }}
        extraConfig={{
          showFullScreen: true,
          showColumnsSetting: true,
          showViewMode: true,
          storageKey: 'one'
        }}
        renderItem={renderItem}
      />
    </>
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
