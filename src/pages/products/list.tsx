import { DeleteFilled, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useTable } from '@refinedev/antd';
import { useList, useNavigation } from '@refinedev/core';
import { Button, Input, List, Table } from 'antd';
import { PATH_NAME_ADMIN } from 'constant/path-route';
import React from 'react';

type ProductListProps = {};
export const ProductList: React.FC<ProductListProps> = () => {
  const { push } = useNavigation();

  const { tableProps, tableQuery } = useTable({
    resource: 'foods',
  });
  const dataSource = tableQuery?.data?.data ?? [];
  const columns = React.useMemo(() => {
    return [
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'name',
        render: (_: any, record: any) => {
          return record.imageFoods?.[0] ? (
            <img src={record.imageFoods?.[0]?.image} alt={record.name} style={{ width: 50, height: 50 }} />
          ) : null;
        },
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Category',
        dataIndex: 'categories',
        key: 'categories',
        render: (_: any, record: any) => {
          return record.categories?.name;
        },
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
      },
      {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (_: any, record: any) => {
          return record.created_at?.split('T')?.[0];
        },
      },
      {
        title: 'Update At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (_: any, record: any) => {
          return record.updated_at?.split('T')?.[0];
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (record: any) => {
          return (
            <div className="" onClick={(e) => e.stopPropagation()}>
              <Button className="group" type="text" onClick={() => push(`/admin/products/edit/${record.id}`)}>
                <EditOutlined className="group-hover:text-blue-500" />
              </Button>
              {/* <Button className="group" type="text">
                <DeleteFilled className="group-hover:text-red-500" />
              </Button> */}
            </div>
          );
        },
      },
    ];
  }, [dataSource]);

  return (
    <List>
      <div className="flex justify-between mb-8">
        <p className="text-[24px] font-bold m-0">Products</p>
        <Button type="primary" onClick={() => push(PATH_NAME_ADMIN.PRODUCTS.CREATE)}>
          Add new dishes
        </Button>
      </div>
      <Table
        {...tableProps}
        columns={columns}
        onRow={(record) => {
          return {
            onClick: () => {
              push(`/admin/products/${record.id}`);
            },
          };
        }}
      />
    </List>
  );
};
