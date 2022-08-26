---
nav:
  title: 组件
  path: /components
---

## 简介

**做了哪些事情**

- 配置化, 配置同 Form 组件
- 属性都透传 antd - Descriptions
- 使用于表单对应的详情页, 只需写一份配置

## 基本使用

```jsx
import React, { useState, useEffect } from 'react'
import { Button } from 'antd'
import { Descriptions } from '@nbfe/components'

const mockData = {
  name: '硕鼠宝',
  age: 18,
  job: 'fe'
}

export default () => {
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    setTimeout(() => {
      setDataSource(mockData)
    }, 1e3)
  }, [setDataSource])

  const columns = [
    {
      label: '姓名',
      name: 'name'
    },
    {
      label: '年龄',
      name: 'age'
    },
    {
      label: '职业',
      name: 'job'
    }
  ]
  return (
    <Descriptions
      title="基本信息"
      extra={
        <Button type="primary" size="small">
          编辑
        </Button>
      }
      column={2}
      columns={columns}
      data={dataSource}
    />
  )
}
```

## 模板

> 参考 [table#内置模板](table#内置模板)

```jsx
import React, { useState, useEffect } from 'react'
import { Descriptions } from '@nbfe/components'
import { OptionsData2 } from '../mock'

const mockData = {
  name: '硕鼠宝',
  age: 18,
  job: 'fe',
  status: 1,
  startAt: 1645098087255,
  img: {
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
  },
  abc: 123
}

export default () => {
  const [dataSource, setDataSource] = useState()

  useEffect(() => {
    setTimeout(() => {
      setDataSource(mockData)
    }, 1e3)
  }, [setDataSource])

  const columns = [
    {
      label: '姓名',
      name: 'name',
      tooltip: '提示文案: [链接|baidu.com]'
    },
    {
      label: '年龄',
      name: 'age'
    },
    {
      label: '职业',
      name: 'job'
    },
    {
      label: '枚举',
      name: 'status',
      template: {
        tpl: 'enum',
        options: OptionsData2,
        shape: 'tag'
      }
    },
    {
      label: '日期',
      name: 'startAt',
      template: {
        tpl: 'date',
        format: 'YYYY-MM-DD hh:mm'
      }
    },
    {
      label: '图片',
      name: 'img.url',
      template: {
        tpl: 'image'
      }
    },
    {
      label: '链接',
      name: 'status',
      template: {
        tpl: 'link',
        render: () => {
          return {
            text: '链接'
          }
        }
      }
    },
    {
      label: '自定义',
      name: 'abc',
      render: value => {
        if (value === undefined) {
          return '--'
        }
        return `${value} + 1 = ${value + 1}`
      }
    }
  ]
  return <Descriptions columns={columns} data={dataSource} />
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
