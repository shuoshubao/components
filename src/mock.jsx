import React from 'react'
import { message, notification } from 'antd'
import { isString } from 'lodash'
import { blue, red } from '@ant-design/colors'
import { sleep } from '@nbfe/tools'

export const OptionsData = [
  {
    label: '选项1',
    value: 1
  },
  {
    label: '选项2',
    value: 2
  },
  {
    label: '选项3',
    value: 3,
    disabled: true
  }
]

export const OptionsData2 = [
  {
    label: '在线',
    value: 1,
    color: '#52c41a'
  },
  {
    label: '离线',
    value: 2,
    color: '#f5222d'
  },
  {
    label: '连接中',
    value: 3,
    color: '#1890ff'
  }
]

export const OptionsData3 = [
  {
    label: '男',
    value: 1,
    color: blue.primary
  },
  {
    label: '女',
    value: 2,
    color: red.primary
  }
]

export const MoreOptionsData = [
  {
    label: '选项1',
    value: 1
  },
  {
    label: '选项2',
    value: 2
  },
  {
    label: '选项3',
    value: 3
  },
  {
    label: '选项4',
    value: 4
  },
  {
    label: '选项5',
    value: 5
  },
  {
    label: '选项6',
    value: 6
  }
]

export const CityOptionsData = [
  {
    label: '北京',
    value: 1
  },
  {
    label: '上海',
    value: 2
  },
  {
    label: '广州',
    value: 3
  }
]

export const TabsOptionsData = [
  {
    label: '选项1',
    value: 'one'
  },
  {
    label: '选项2',
    value: 'two'
  },
  {
    label: '选项3',
    value: 'three'
  }
]

export const CascaderOptions = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou'
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'suzhou',
        label: 'Suzhou'
      }
    ]
  }
]

export const TreeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1'
      },
      {
        title: 'Child Node2',
        value: '0-0-2'
      }
    ]
  },
  {
    title: 'Node2',
    value: '0-1'
  }
]

export const showMessage = (title, json) => {
  if (!json) {
    message.success(title)
    return
  }
  notification.info({
    message: title,
    description: (
      <pre style={{ margin: 0, background: '#f6f7f9', padding: 5 }}>
        <code>{JSON.stringify(json, '', 2)}</code>
      </pre>
    ),
    duration: 3
  })
}

export const dataSource = [
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
  },
  {
    name: '蓝湖',
    image: 'https://s3-alpha.figma.com/profile/1a6a6481-773b-4ab6-9e82-004230b713fd',
    homepage: 'https://lanhuapp.com/',
    desc: '高效的产品设计协作平台'
  },
  {
    name: 'WPS',
    image: 'https://static.epy.wpscdn.cn/favicon.ico',
    homepage: 'https://www.wps.cn/',
    desc: '支持多人在线协作编辑Word、Excel和PPT文档'
  },
  {
    name: 'VSCode',
    image: 'https://code.visualstudio.com/favicon.ico',
    homepage: 'https://code.visualstudio.com/',
    desc: '宇宙最强编辑器'
  },
  {
    name: 'Google Chrome',
    image: 'https://www.google.com/chrome/static/images/chrome-logo-m100.svg',
    homepage: 'https://www.google.com/intl/zh-CN/chrome/',
    desc: '强大、快速的网页浏览器'
  },
  {
    name: 'Postman',
    image: 'https://user-images.githubusercontent.com/7853266/44114706-9c72dd08-9fd1-11e8-8d9d-6d9d651c75ad.png',
    homepage: 'https://www.postman.com',
    desc: 'Api 管理平台'
  },
  {
    name: 'Sketch',
    image: 'https://pbs.twimg.com/media/EvGFRqVUcAA3BRd?format=jpg&name=4096x4096',
    homepage: 'https://www.sketch.com',
    desc: '原型图'
  },
  {
    name: 'XMind',
    image: 'https://xmind.app/favicon.ico',
    homepage: 'https://xmind.app',
    desc: '思维导图'
  },
  {
    name: 'Sourcetree',
    image: 'https://wac-cdn.atlassian.com/assets/img/favicons/sourcetree/favicon-32x32.png',
    homepage: 'https://www.sourcetreeapp.com',
    desc: 'Git 图形化客户端'
  }
].map((v, i) => {
  return { ...v, id: i + 1 }
})

export const getRemoteTableData = async params => {
  const { currentPage, pageSize } = params
  const pivot = (currentPage - 1) * pageSize
  const list = dataSource.slice(pivot, currentPage * pageSize)
  const data = {
    list,
    total: dataSource.length
  }
  console.log('----- getRemoteTableData -----', 'start')
  console.log(params)
  console.log(data)
  console.log('----- getRemoteTableData -----', 'end')
  await sleep()
  return data
}
