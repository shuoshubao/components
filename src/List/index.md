---
toc: content
---

## 简介

- 集成接口请求
- 集成分页功能
- renderItem 配置化

## 基本使用

### 本地数据源

`renderItem(item, index, Item)`

`renderItem` 既可以像原生的一样直接返回 `ReactNode`, 也可以返回 `json`

```json
{
  // 和 Table 组件的 tpl: 'link' 配置一样
  actions: ITableColumnTemplateLinkRender | ITableColumnTemplateLinkRender[],
  extra: ReactNode,
  content: ReactNode,
  meta: {
    avatar: String
  }
}
```

```jsx
import React from 'react'
import { List } from '@nbfe/components'
import { dataSource } from '../mock'

export default () => {
  return (
    <List
      rowKey="id"
      dataSource={dataSource}
      pagination={{
        defaultPageSize: 3
      }}
      renderItem={item => {
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

### 接口请求

```jsx
import React, { useRef } from 'react'
import { List } from '@nbfe/components'
import { Button } from 'antd'
import { getRemoteTableData } from '../mock'

export default () => {
  const listRef = useRef()

  const handleSearch = () => {
    listRef.current.search()
  }

  return (
    <>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <List
        ref={listRef}
        rowKey="id"
        remoteConfig={{
          fetch: getRemoteTableData
        }}
        pagination={{
          defaultPageSize: 3
        }}
        renderItem={item => {
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
    </>
  )
}
```

## 栅格

```jsx
import React from 'react'
import { List } from '@nbfe/components'
import { dataSource } from '../mock'

export default () => {
  return (
    <List
      rowKey="id"
      dataSource={dataSource}
      pagination={{
        defaultPageSize: 6
      }}
      grid={{ gutter: 16, column: 3 }}
      renderItem={item => {
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

## 栅格+卡片

```jsx
import React from 'react'
import { List } from '@nbfe/components'
import { Card, Avatar, Typography } from 'antd'
import { dataSource } from '../mock'

const { Link } = Typography

export default () => {
  return (
    <List
      rowKey="id"
      dataSource={dataSource}
      pagination={{
        defaultPageSize: 6
      }}
      grid={{ gutter: 12, column: 3 }}
      renderItem={item => {
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
      }}
    />
  )
}
```

## API

属性完全透传 [Antd - List](https://4x.ant.design/components/list-cn/#API)

```jsx
import React from 'react'
import api from './api.json'
import ComponentApi from '../ComponentApi'

export default () => {
  return <ComponentApi api={api} />
}
```
