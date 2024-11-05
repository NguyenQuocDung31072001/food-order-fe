import { useTranslate, IResourceComponentsProps } from '@refinedev/core';
import { List, useTable, EditButton, ShowButton, DeleteButton } from '@refinedev/antd';
import { Table, Space, Tag } from 'antd';

export const BrandList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    resource: 'brand',
    meta: {
      join: ['lines'],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" align="center" title={'ID'} />
        <Table.Column dataIndex="name" title={'Name'} />
        <Table.Column dataIndex="code" title={'Code'} />
        <Table.Column
          key="lines"
          title={'Lines'}
          render={(record) => {
            return record?.lines?.map((line: any) => {
              return <Tag color="blue">{line.name}</Tag>;
            });
          }}
        />
        <Table.Column
          title={'Action'}
          render={(_value, record: any) => {
            return (
              <Space>
                <EditButton hideText size="small" recordItemId={record.id} />
              </Space>
            );
          }}
        />
      </Table>
    </List>
  );
};
