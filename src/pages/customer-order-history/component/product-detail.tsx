import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ModalReview } from './modal-review';
import { useList, useParsed } from '@refinedev/core';

export const ProductOrderDetail = () => {
  const { id } = useParsed();
  const { data } = useList({
    resource: 'order-foods',
    filters: [
      {
        field: 'order_id',
        operator: 'eq',
        value: id,
      },
    ],
  });

  const dataSource = (data?.data ?? [])?.map((item) => {
    return {
      id: item.id,
      image: item.food?.imageFoods?.[0]?.image,
      name: item.food?.name,
      price: item.food?.price,
      quantity: item.quantity,
      subtotal: Number(item.food?.price) * Number(item.quantity),
    };
  });
  const columns: ColumnsType<any> = [
    {
      title: 'Product',
      key: 'product',
      width: '40%',
      render: (_, record) => {
        return (
          <div className="flex items-center">
            <img src={record.image} alt={record.name} className="w-16 h-16 rounded-[10px]" />

            <span className="ml-2">{record.name}</span>
          </div>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (price) => <span>${price}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      render: (quantity) => <span>x{quantity}</span>,
    },
    {
      title: 'Subtotal',
      dataIndex: 'subtotal',
      key: 'subtotal',
      width: '30%',
      render: (subtotal, record) => (
        <div className="flex justify-start items-center">
          <span className="font-semibold mr-8">${subtotal}</span>
          <ModalReview record={record} />
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: 5,
      }}
    />
  );
};
