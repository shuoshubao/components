import React, { Fragment } from 'react';
import { Typography } from 'antd';
import Table from '@ke/table';
import { isObject } from 'lodash';

const { Title } = Typography;

export default ({ api }) => {
  const propsColumns = [
    { title: '属性名', dataIndex: 'name' },
    { title: '说明', dataIndex: 'desc' },
    { title: '类型', dataIndex: 'type' },
    { title: '默认值', dataIndex: 'default' }
  ].map((v) => {
    return {
      ...v,
      render: (value) => {
        if (isObject(value)) {
          return (
            <pre className="dynamic-table-render-code">
              <code>{JSON.stringify(value, '', 2)}</code>
            </pre>
          );
        }
        if (v.dataIndex === 'type') {
          return <div style={{ color: '#c41d7f' }} dangerouslySetInnerHTML={{ __html: value }} />;
        }
        return <div dangerouslySetInnerHTML={{ __html: value }} />;
      }
    };
  });
  const eventsColumns = [
    { title: '事件名', dataIndex: 'name' },
    { title: '说明', dataIndex: 'desc' },
    { title: '参数', dataIndex: 'args' }
  ].map((v) => {
    return {
      ...v,
      render: (value) => {
        if (isObject(value)) {
          return (
            <pre className="dynamic-table-render-code">
              <code>{JSON.stringify(value, '', 2)}</code>
            </pre>
          );
        }
        return <div dangerouslySetInnerHTML={{ __html: value }} />;
      }
    };
  });
  const methodsColumns = [
    { title: '方法名', dataIndex: 'name' },
    { title: '说明', dataIndex: 'desc' },
    { title: '参数', dataIndex: 'args' }
  ].map((v) => {
    return {
      ...v,
      render: (value) => {
        if (isObject(value)) {
          return (
            <pre className="dynamic-table-render-code">
              <code>{JSON.stringify(value, '', 2)}</code>
            </pre>
          );
        }
        return <div dangerouslySetInnerHTML={{ __html: value }} />;
      }
    };
  });
  const { props = [], events = [], methods = [], columns } = api;
  const commonTableProps = {
    rowKey: 'name',
    size: 'small',
    pagination: false
  };
  return (
    <Fragment>
      {!!props.length && (
        <Table
          title={() => <Title level={4}>属性</Title>}
          columns={propsColumns}
          dataSource={props}
          {...commonTableProps}
        />
      )}
      {!!events.length && (
        <Table
          title={() => <Title level={4}>事件</Title>}
          columns={eventsColumns}
          dataSource={events}
          {...commonTableProps}
        />
      )}
      {!!methods.length && (
        <Table
          title={() => <Title level={4}>方法</Title>}
          columns={methodsColumns}
          dataSource={methods}
          {...commonTableProps}
        />
      )}
      {!!columns.length && (
        <Table
          title={() => <Title level={4}>Column.Item 属性</Title>}
          columns={propsColumns}
          dataSource={columns}
          {...commonTableProps}
        />
      )}
    </Fragment>
  );
};
