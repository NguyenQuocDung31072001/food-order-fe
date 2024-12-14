import { List, useTable } from '@refinedev/antd';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { EditOutlined } from '@ant-design/icons';
import { PaymentMethodAction } from './action';

export const PaymentMethods: React.FC<{}> = () => {
  const { tableProps, tableQuery } = useTable({
    resource: 'payment-methods',
    sorters: {
      permanent: [
        {
          field: 'updated_at',
          order: 'desc',
        },
      ],
    },
    pagination: {
      pageSize: 100,
    },
  });

  const dataSource = tableQuery?.data?.data ?? [];

  const columns: ColumnsType = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at',
      key: 'updated_at',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: null,
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <PaymentMethodAction
            buttonLabel={<EditOutlined />}
            modalTitle="Update Payment Method"
            id={record?.id}
            refetchList={() => {
              tableQuery.refetch();
            }}
          />
        );
      },
    },
  ];
  return (
    <List title="Payment methods">
      <PaymentMethodAction
        buttonLabel="+ Add new"
        modalTitle="Create Payment Method"
        refetchList={() => {
          tableQuery.refetch();
        }}
      />
      <Table
        {...tableProps}
        loading={tableQuery.isLoading || tableQuery.isFetching}
        columns={columns}
        dataSource={dataSource}
      />
    </List>
  );
};
