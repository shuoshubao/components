---
nav:
  title: 组件
  path: /components
---

## 简介

**功能点:**

- 集成接口请求
- 集成分页功能
- 内置丰富模板
- 可编辑单元格

## 基本使用

### 本地数据源

当不使用接口请求时, 数据源通过 **dataSource** 属性传入

```jsx
import React, { useState, Fragment } from 'react';
import { Button } from 'antd';
import Table from '@ke/table';

export default () => {
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name'
    }
  ];

  const handleSearch = async () => {
    const data = [
      {
        id: 1,
        name: 'aaa'
      },
      {
        id: 2,
        name: 'bbb'
      }
    ];
    setDataSource(data);
  };

  return (
    <Fragment>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <Table key={Date.now()} rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" />
    </Fragment>
  );
};
```

### 接口请求

当数据不是固定的, 比如 1. 有搜索; 2. 分页时需请求接口, 这时候不配置属性 **dataSource**, 而只需配置属性 **remoteConfig**, 然后在需要的地方调用 tableRef.current.search() 即可

```jsx
import React, { useRef, Fragment } from 'react';
import { Button } from 'antd';
import { sleep } from '@nbfe/tools';
import Table from '@ke/table';

const dataSource = [
  {
    id: 1,
    name: 'aaa'
  },
  {
    id: 2,
    name: 'bbb'
  }
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id'
  },
  {
    title: '姓名',
    dataIndex: 'name'
  }
];

const remoteConfig = {
  fetch: async () => {
    await sleep(); // 这里是为了模拟接口
    return {
      data: {
        list: dataSource,
        total: dataSource.length
      },
      code: 0,
      message: '成功'
    };
  },
  dataSourceKey: 'data.list',
  totalKey: 'data.total'
};

export default () => {
  const tableRef = useRef();

  const handleSearch = () => {
    tableRef.current.search();
  };

  return (
    <Fragment>
      <Button type="primary" onClick={handleSearch}>
        请求数据
      </Button>
      <Table ref={tableRef} rowKey="id" columns={columns} size="small" remoteConfig={remoteConfig} />
    </Fragment>
  );
};
```

## 内置模板

除了以下列举的模板外, 还支持 Form 组件所有的模板, 这里就不赘述, 详见: [编辑](#编辑)

<table class="custom-table-header-left">
    <colgroup>
        <col width="80px" />
    </colgroup>
    <thead>
        <tr>
            <th></th>
            <th colspan="6">展示类</th>
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
import React from 'react';
import { Typography } from 'antd';
import Table from '@ke/table';
import 'rc-image/assets/index.css';
import { OptionsData2 } from '../mock';

export default () => {
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
  ];

  const columns2 = [
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
  ];

  const dataSource = [
    {
      id: 1,
      desc: 'aaa',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
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
      textEmpty: '',
      textEmpty2: 'bbb',
      textArray: ['aaa', 'bbb'],
      createAt: '2021-11-11 11:11:11',
      code1: 'import Table from "@ke/table";',
      code2: {},
      enum: 2
    },
    {
      id: 4,
      desc: 'ddd',
      imgUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      textEmpty: '',
      textEmpty2: 'bbb',
      textArray: ['aaa', 'bbb'],
      createAt: '2021-11-11 11:11:11',
      code1: 'import Form from "@ke/form";',
      code2: { a: 1, b: [1, 2] },
      enum: null
    }
  ];
  return (
    <>
      <Table rowKey="id" columns={columns1} dataSource={dataSource} pagination={false} />
      <Typography.Title level={4}>枚举</Typography.Title>
      <Table rowKey="id" columns={columns2} dataSource={dataSource} pagination={false} />
    </>
  );
};
```

### 操作

```jsx
import React from 'react';
import { message } from 'antd';
import { sleep } from '@nbfe/tools';
import Table from '@ke/table';

const dataSource = [
  {
    id: 1,
    status: 'online'
  },
  {
    id: 2,
    status: 'offline'
  }
];

export default () => {
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
          const { status } = record;
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
          ];
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
                message.success('可以写任意事件');
              }
            }
          ];
        }
      }
    },
    {
      title: '可见性',
      tooltip: 'visible: true|false',
      template: {
        tpl: 'link',
        render: (text, record, index) => {
          const { status } = record;
          return [
            {
              text: '上线',
              visible: status === 'offline'
            },
            {
              text: '下线',
              visible: status === 'online'
            }
          ];
        }
      }
    },
    {
      title: '弱提醒',
      tooltip: 'Popconfirm',
      template: {
        tpl: 'link',
        render: (text, record, index) => {
          const { status } = record;
          const isOnline = status === 'online';
          const text2 = isOnline ? '下线' : '上线';
          return [
            {
              text: text2,
              PopconfirmConfig: {
                title: `确认要${text2}么?`,
                onConfirm: async () => {
                  // 这里写异步代码, 异步执行完成之后, 组件将自动触发重新请求数据
                  await sleep();
                }
              }
            }
          ];
        }
      }
    },
    {
      title: '强提醒',
      tooltip: 'Modal.confirm',
      template: {
        tpl: 'link',
        render: (text, record, index) => {
          const { status } = record;
          const isOnline = status === 'online';
          const text2 = isOnline ? '下线' : '上线';
          return [
            {
              text: text2,
              danger: true,
              ModalConfirmConfig: {
                title: `确认要${text2}么?`,
                content: '操作不可逆, 请仔细确认哦~',
                onOk: async () => {
                  // 这里写异步代码, 异步执行完成之后, 组件将自动触发重新请求数据
                  await sleep();
                }
              }
            }
          ];
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
          ];
        }
      }
    }
  ];
  return (
    <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 1000 }} />
  );
};
```

### 数字类

```jsx
import React from 'react';
import Table from '@ke/table';

const dataSource = [
  { id: 1, digit: null, percent: null, rate: null, progress: null },
  { id: 2, digit: 1234, percent: 12.34, rate: 4, progress: 75 }
];

export default () => {
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
  ];
  return (
    <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} size="small" scroll={{ x: 1000 }} />
  );
};
```

## 自定义模板

直接和 antd-table 一样传入 render(text, record, index) 函数即可。

~~当业务中存在相似的模板时, 请封装对应的 render 函数即可, 千万别大量复制粘贴\~)~~

## 工具栏

- `extraConfig.showTotal = true` // 在左上角展示总条数
- `extraConfig.fullScreen = true` // 展示全屏按钮
- `extraConfig.storageKey = 'uniqId'` // 表头配置, 如果一个页面有多个表格需要表头设置功能, 请确保 key 不同, 用以存储各个表格的状态

```jsx
import React from 'react';
import Table from '@ke/table';

const dataSource = [
  { id: 1, name: 'Tom', sex: 1, age: 3 },
  { id: 2, name: 'Jerry', sex: 1, age: 5 }
];

export default () => {
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '性别',
      dataIndex: 'sex'
    },
    {
      title: '年龄',
      dataIndex: 'age'
    }
  ];
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      extraConfig={{ showTotal: true, fullScreen: true, storageKey: 'one' }}
    />
  );
};
```

## 编辑

- `column.editable = true`
- `column.template.tpl = 'input' | 'select' ... ` (全部模板参考 [内置表单组件](/components/form))

```jsx
import React, { useRef, useEffect } from 'react';
import Table from '@ke/table';
import { showMessage, OptionsData3 } from '../mock';

const dataSource = [
  { id: 1, name: 'Tom', sex: 1, age: 3, birth: '2019-01-01', studyStart: '2010-09-01', studyEnd: '2014-07-01' },
  { id: 2, name: 'Jerry', sex: 2, age: 5, birth: '2017-02-23', studyStart: '2017-09-01', studyEnd: '2010-07-01' }
];

export default () => {
  const tableRef = useRef();

  useEffect(() => {
    tableRef.current.search();
  }, [tableRef]);

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
                showMessage('当前行的数据', record);
              }
            }
          ];
        }
      }
    }
  ];
  return (
    <Table
      ref={tableRef}
      rowKey="id"
      columns={columns}
      remoteConfig={{
        fetch: async () => {
          return { list: dataSource };
        }
      }}
      pagination={false}
    />
  );
};
```

## 排序(拖拽)

跟拖拽排序有关的配置

- **draggable: true** 拖拽整行
- **{ tpl: 'sort' }** 拖拽句柄
- onDragSortEnd 拖拽排序完成回调

### 拖拽排序

```jsx
import React, { useRef, useEffect } from 'react';
import Table from '@ke/table';
import { showMessage, OptionsData3 } from '../mock';

const dataSource = [
  { id: 1, name: 'Tom', sex: 1 },
  { id: 2, name: 'Jerry', sex: 2 },
  { id: 3, name: 'Herry', sex: 1 }
];

export default () => {
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
                showMessage('当前行的数据', record);
              }
            }
          ];
        }
      }
    }
  ];
  return <Table rowKey="id" draggable columns={columns} dataSource={dataSource} pagination={false} />;
};
```

### 拖拽手柄列

如果你想换个图标, 配置 **{ tpl: 'sort', icon: ReactNode }** 即可

```jsx
import React, { useRef, useEffect } from 'react';
import Table from '@ke/table';
import { showMessage, OptionsData3 } from '../mock';

const dataSource = [
  { id: 1, name: 'Tom', sex: 1 },
  { id: 2, name: 'Jerry', sex: 2 },
  { id: 3, name: 'Herry', sex: 1 }
];

export default () => {
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
                showMessage('当前行的数据', record);
              }
            }
          ];
        }
      }
    }
  ];
  return <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={false} />;
};
```

### 拖拽排序+编辑

拖拽排序 + 编辑 + 远端数据 + 分页

```jsx
import React, { useRef, useEffect } from 'react';
import Table from '@ke/table';
import { showMessage, OptionsData3 } from '../mock';

const dataSource = [
  { id: 1, name: 'Tom', sex: 1, birth: '2019-01-01', studyStart: '2010-09-01', studyEnd: '2014-07-01' },
  { id: 2, name: 'Jerry', sex: 2, birth: '2017-02-23', studyStart: '2017-09-01', studyEnd: '2010-07-01' },
  { id: 3, name: 'Herry', sex: 1, birth: '2019-07-01', studyStart: '2005-09-01', studyEnd: '2008-07-01' },
  { id: 4, name: 'Tuffy', sex: 1, birth: '2010-07-01', studyStart: '2005-09-01', studyEnd: '2008-07-01' }
];

export default () => {
  const tableRef = useRef();

  useEffect(() => {
    tableRef.current.search();
  }, [tableRef]);

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
                showMessage('当前行的数据', record);
              }
            }
          ];
        }
      }
    }
  ];

  return (
    <Table
      rowKey="id"
      ref={tableRef}
      columns={columns}
      remoteConfig={{
        fetch: async () => {
          return {
            list: dataSource,
            total: dataSource.length
          };
        }
      }}
      pagination={{
        defaultPageSize: 2
      }}
    />
  );
};
```

## API

```jsx
import React from 'react';
import api from './api.json';
import ComponentApi from '../ComponentApi';

export default () => {
  return <ComponentApi api={api} />;
};
```
