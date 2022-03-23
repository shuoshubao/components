import React from 'react';
import { message, notification } from 'antd';
import { isString } from 'lodash';
import { blue, red } from '@ant-design/colors';

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
];

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
];

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
];

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
];

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
];

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
];

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
];

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
];

export const showMessage = (title, json) => {
  if (!json) {
    message.success(title);
    return;
  }
  notification.info({
    message: title,
    description: (
      <pre style={{ margin: 0, background: '#f6f7f9', padding: 5 }}>
        <code>{JSON.stringify(json, '', 2)}</code>
      </pre>
    ),
    duration: 3
  });
};
