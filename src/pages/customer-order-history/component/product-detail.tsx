import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { ModalReview } from './modal-review';

const dataSource = Array(20)
  .fill(0)
  .map((_, index) => {
    return {
      id: index,
      image:
        'https://sashasfinefoods.com/cdn/shop/products/WEB_Product_Red-Capsicum_a720efe1-2f89-4e7a-a656-a8714cee57f0_1000x1000.png?v=1715060488',
      name: 'Red Capsicum',
      price: 10,
      quantity: 5,
      subtotal: 50,
    };
  });

export const ProductOrderDetail = () => {
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
