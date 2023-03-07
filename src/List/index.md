```jsx
import React from 'react'
import { List } from '@nbfe/components'

const dataSource = [
  {
    name: '语雀的天空',
    image: 'https://mdn.alipayobjects.com/huamei_0prmtq/afts/img/A*sRUdR543RjcAAAAAAAAAAAAADvuFAQ/original',
    homepage: 'https://yuque.com',
    desc: '用语雀，构建你的数字花园'
  },
  {
    name: 'Ant Design',
    image: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    homepage: 'https://ant.design',
    desc: '助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～'
  },
  {
    name: '蚂蚁金服体验科技',
    image: 'https://gw.alipayobjects.com/zos/rmsportal/bhvWYkprkSwZohvBCayP.png',
    homepage: 'https://xcloud.alipay.com',
    desc: '让用户体验美好'
  },
  {
    name: 'Kitchen',
    image: 'https://gw.alipayobjects.com/zos/bmw-prod/51a51720-8a30-4430-b6c9-be5712364f04.svg',
    homepage: 'https://kitchen.alipay.com',
    desc: '让你的设计秀色可餐, 一款为设计者提升工作效率的 Sketch 工具集'
  }
]

export default () => {
  return (
    <List
      rowKey="name"
      dataSource={dataSource}
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
          // extra: '111',
          // content: desc,
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
