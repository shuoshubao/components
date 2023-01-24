## Form

### template 字段详解

template 的作用是用一段 json 来描述一个基础的 antd 表单元素组件, 其中使用特殊字段 **tpl** 来标识使用的是哪种组件; 内置 16 种在后台系统中常用的表单元素组件.

除了少数几个特殊的字段(value, onChange)字段外, 其他字段基本可以透传. 结合 antd 文档即可使用, 这里不再赘述.

### 表单子组件的配置

<table>
  <colgroup>
    <col width="160px" />
    <col width="100px" />
    <col width="" />
    <col width="" />
    <col width="200px" />
  </colgroup>
  <thead>
    <tr>
      <th>tpl</th>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">input</td>
      <td>inputType</td>
      <td>输入框的类型</td>
      <td>
        <div>input: 输入框</div>
        <div>search: 输入框+搜索</div>
        <div>select-search: 下拉框+输入框+搜索</div>
        <div>select-input: 下拉框+输入框</div>
        <div>textarea: 文本域</div>
        <div>password: 密码</div>
      </td>
      <td>input</td>
    </tr>
    <tr>
      <td>inputWidth</td>
      <td>输入框的宽度</td>
      <td>number</td>
      <td>200</td>
    </tr>
    <tr>
      <td>selectWidth</td>
      <td>下拉框的宽度</td>
      <td>number</td>
      <td>100</td>
    </tr>
    <tr>
      <td>options</td>
      <td>下拉框的数据源</td>
      <td>{ label, value }[]</td>
      <td>[]</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">number-range</td>
      <td>separator</td>
      <td>分割符</td>
      <td>string</td>
      <td>~</td>
    </tr>
    <tr>
      <td>separatorWidth</td>
      <td>分割符宽度</td>
      <td>number</td>
      <td>30</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">select</td>
      <td>allItem</td>
      <td>
        <div>第一项</div>
        <div>比如 { label: '全部', value: null }</div>
      </td>
      <td>{ label, value }</td>
      <td>null</td>
    </tr>
    <tr>
      <td>remoteConfig</td>
      <td>远端数据源配置</td>
      <td>IRemoteConfig</td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>checkbox</td>
      <td>indeterminate</td>
      <td>是否展示[全选]</td>
      <td>boolean</td>
      <td>false</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>cascader</td>
      <td>remoteConfig</td>
      <td>远端数据源配置</td>
      <td>IRemoteConfig</td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>tree-select</td>
      <td>remoteConfig</td>
      <td>远端数据源配置</td>
      <td>IRemoteConfig</td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">auto-complete</td>
      <td>remoteConfig</td>
      <td>远端数据源配置</td>
      <td>
        <div>IRemoteConfig</div>
        <pre>{<br />  fetch: async(query) => {<br />    // query 是用户输入的内容<br />    await sleep()<br />    return { label, value }[]<br />  }<br />}</pre>
      </td>
      <td>null</td>
    </tr>
    <tr>
      <td>debounce</td>
      <td>debounce 等待时长(ms)</td>
      <td>number</td>
      <td>200</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>slider</td>
      <td>InputNumberWidth</td>
      <td>输入框的宽度</td>
      <td>number</td>
      <td>65</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">sort</td>
      <td>handler</td>
      <td>拖拽的图标</td>
      <td>ReactNode</td>
      <td>&lt;MenuOutlined /></td>
    </tr>
    <tr>
      <td>disabledSort</td>
      <td>禁用拖拽排序</td>
      <td>(record, index)=> boolean</td>
      <td>null</td>
    </tr>
  </tbody>
</table>

## Table

### template 字段详解

template 的作用是用一段 json 来描述一个 render 函数, 其中使用特殊字段 **tpl** 来标识使用的是哪种渲染器.

### 渲染器的配置

<table>
  <colgroup>
    <col width="100px" />
    <col width="150px" />
    <col width="" />
    <col width="" />
    <col width="200px" />
  </colgroup>
  <thead>
    <tr>
      <th>子组件</th>
      <th>属性名</th>
      <th>说明</th>
      <th>类型</th>
      <th>默认值</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3">text</td>
      <td>separator</td>
      <td>
        <div>分隔符, 当数据是数组时, 每一项之间的间隔</div>
        <div>当是 'div' 时, 表示换行</div>
      </td>
      <td>ReactNode</td>
      <td>''</td>
    </tr>
    <tr>
      <td>ellipsis</td>
      <td>自动溢出省略，为对象时不能设置省略行数、是否可展开、onExpand 展开事件</td>
      <td>
        <a href="https://ant.design/components/typography-cn/#ellipsis">ellipsis</a>
      </td>
      <td>null</td>
    </tr>
    <tr>
      <td>
        <a href="https://ant.design/components/typography-cn/#Typography.Paragraph">Typography.Paragraph</a>
      </td>
      <td>
        <div>透传, 例如:</div>
        <ul>
          <li>delete</li>
          <li>disabled</li>
          <li>mark</li>
          <li>strong</li>
          <li>type</li>
        <ul>
      </td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">enum</td>
      <td>options</td>
      <td>数据源</td>
      <td>IEnum[]</td>
      <td>[]</td>
    </tr>
    <tr>
      <td>shape</td>
      <td>展示形状</td>
      <td>
        <div>tag: antd - Tag<div>
        <div>dot: 前面小圆点<div>
        <div>square: 前面小方块<div>
        <div>circle: 边框 + 圆角<div>
      </td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>image</td>
      <td>width/height</td>
      <td>宽高</td>
      <td>Number</td>
      <td>50</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>date</td>
      <td>format</td>
      <td>日期格式化</td>
      <td>string</td>
      <td>'YYYY-MM-DD'</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>link</td>
      <td>render</td>
      <td>函数</td>
      <td>
        <div>(text, record, index) => ITableColumnTemplateLinkRender[]</div>
        <div>text: 按钮文案</div>
        <div>visible: 按钮可见性</div>
        <div>href: 链接地址</div>
        <div>query: query参数</div>
        <div>tooltip: 提示文案</div>
        <div>isMore: 是否要展示在下拉框里</div>
        <div>icon: 图标</div>
        <div>PopconfirmConfig: 二次确认 弱提醒</div>
        <div>ModalConfirmConfig: 二次确认 强提醒</div>
      </td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>code</td>
      <td>language</td>
      <td>语言, 目前就支持json</td>
      <td>'text', 'json'</td>
      <td>'text'</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="2">digit</td>
      <td>prefix</td>
      <td>前缀</td>
      <td>ReactNode</td>
      <td>null</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>后缀</td>
      <td>ReactNode</td>
      <td>null</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td rowspan="3">percent</td>
      <td>precision</td>
      <td>精度</td>
      <td>number</td>
      <td>2</td>
    </tr>
    <tr>
      <td>times</td>
      <td>次幂</td>
      <td>number</td>
      <td>2</td>
    </tr>
    <tr>
      <td>suffix</td>
      <td>后缀</td>
      <td>ReactNode</td>
      <td>'%'</td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>rate</td>
      <td>
        <a href="https://ant.design/components/rate-cn/#API">Rate Props</a>
      </td>
      <td>
        <div>透传, 例如:</div>
        <ul>
          <li>allowHalf</li>
          <li>character</li>
          <li>count</li>
        <ul>
      </td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>progress</td>
      <td>
          <a href="https://ant.design/components/progress-cn/#API">Progress Props</a>
      </td>
      <td>
        <div>透传, 例如:</div>
        <ul>
          <li>type</li>
          <li>format</li>
          <li>showInfo</li>
          <li>status</li>
        <ul>
      </td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

## TS 类型定义

```ts
interface IEnum {
  value: string | number;
  label: ReactNode;
  disabled?: boolean;
  color?: string;
  children?: IEnum[];
}

interface IRemoteConfig {
  fetch?: Promise<any>; // 远端数据
  process?: (): any; // 对返回数据的进一步处理
  path?: string; // 接口返回数据, 所需数据的路径
  valueKey?: string; // value
  labelKey?: string; // label
  renderLabel?: (item: object): ReactNode; // renderLabel
  childrenKey?: string; // cascader 结构的子节点
}

interface IFormColumnTemplate {
  tpl?: string | React.Component,
  [propName: string]: any;
}

interface IFormColumn {
  label?: string; // 左侧文案
  name?: string; // 后端字段
  placeholder?: string; // 输入框选择框的 placeholder
  tooltip?: string | string[]; // label 的提示文案
  immediate?: boolean; // 是否立即触发提交事件
  defaultValue?: string | number | (string | number)[]; // 默认值
  inline?: boolean; // 是否换行
  style?: CSSProperties; // form-item 样式
  template?: IFormColumnTemplate; // 内置模板 或 自定义组件
  [propName: string]: any;
}

interface ITableColumnTemplateLinkRender {
  text?: ReactNode;
  visible?: boolean; // 可见性
  href?: string; // 完整链接
  query?: object; // query 参数
  tooltip?: string | string[]; // 提示
  isMore?: boolean; // 展示为更多, 在...的下拉框里展示
  icon?: string | ReactNode;
  PopconfirmConfig: {
    title: string;
    onConfirm: () => {}
  },
  ModalConfirmConfig: {
    title: string;
    content?: string;
    onOk: () => {}
  },
  [propName: string]: any;
}
```
