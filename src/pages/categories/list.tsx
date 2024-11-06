import { List, useTable } from '@refinedev/antd';
import { useNavigation } from '@refinedev/core';
import { Button, Table } from 'antd';
import React from 'react';

export const CategoriesList: React.FC = () => {
  const { push } = useNavigation();
  const { tableProps, tableQuery } = useTable({
    resource: 'categories',
  });
  const _data = tableQuery.data?.data;
  const dataSource = React.useMemo(() => {
    return _data?.map((item: any) => item);
  }, [_data]);

  const columns = React.useMemo(() => {
    return [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        width: '50%',
        render: (value: string) => {
          return (
            <img
              style={{
                width: '50px',
                height: '50px',
                objectFit: 'cover',
              }}
              src={value}
            />
          );
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '50%',
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: any) => {
          return (
            <div>
              <Button
                type="link"
                onClick={() => {
                  push(`/categories/edit/${record.id}`);
                }}
              >
                Edit
              </Button>
            </div>
          );
        },
      },
    ];
  }, [dataSource]);
  return (
    <List title="Categories listing">
      <Table rowKey="id" {...tableProps} columns={columns} dataSource={dataSource} />
    </List>
  );
};
