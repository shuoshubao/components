---
toc: content
---

## 简介

- 集成接口请求
- 集成分页功能

## 基本使用

### 本地数据源

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
