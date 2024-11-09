import { Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
import { Link } from 'react-router-dom';

const dataSource = Array(100)
  .fill(0)
  .map((_, index) => {
    return {
      id: index,
      order_number: '123456',
      total_charge: 100,
      place_on: '2021-10-10',
      payment_method: 'Cash',
      status: 'Delivered',
      address: '123 Main St, New York, NY 10001',
    };
  });

export const CustomerOrderHistoryList: React.FC = () => {
  const columns: ColumnsType<any> = [
    {
      title: 'Order Number',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (text, record) => <span className="font-bold">#{text}</span>,
    },
    {
      title: 'Total Charge',
      dataIndex: 'total_charge',
      key: 'total_charge',
      render: (text, record) => <span className="font-bold">{text}$</span>,
    },
    {
      title: 'Place On',
      dataIndex: 'place_on',
      key: 'place_on',
      render: (text, record) => <span className="font-normal text-gray-500">{text}</span>,
    },
    {
      title: 'Payment Method',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render: (text, record) => <span className="font-bold">{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '',
      key: 'view-details',
      render: (text, record) => {
        return (
          <Link
            to={`${PATH_NAME_CUSTOMER.ORDER_HISTORY.INDEX}/${record.id}`}
            className="text-yellow-500 font-semibold hover:font-bold hover:text-yellow-500 duration-300"
          >
            View Detail
          </Link>
        );
      },
    },
  ];
  return (
    <div>
      <p className="text-[24px] font-semibold">Order History</p>
      <Table columns={columns} dataSource={dataSource} sticky={true} />
    </div>
  );
};
