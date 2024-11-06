import { Show } from '@refinedev/antd';
import { ImageCarousel } from './component/image-carousel';
import { Button, Divider, Popconfirm, Rate, Tag, Typography } from 'antd';
import { useOne, useParsed } from '@refinedev/core';
import { DeleteFilled } from '@ant-design/icons';

export const ProductShow: React.FC = () => {
  const { id } = useParsed();
  const { data, isLoading } = useOne({
    resource: 'foods',
    id: id,
  });
  const _data = data?.data;

  return (
    <Show isLoading={isLoading}>
      <div className="flex justify-between">
        <div className="w-[45%]">
          <ImageCarousel imageLists={_data?.imageFoods?.map((im: any) => im.image) ?? []} />
        </div>
        <div className="w-[50%] relative">
          <div className="flex items-center ">
            <Typography.Title className="mr-4">{_data?.name}</Typography.Title>
            <Tag color="green" className="mb-2">
              in Stock
            </Tag>
          </div>

          <div className="mb-8">
            <Rate allowHalf defaultValue={2.5} />
            <span>8 Review</span>
          </div>
          <div className="flex justify-between">
            <div className="flex text-[24px] items-center">
              {/* <span className="text-gray-500 line-through mr-4">$48.00</span> */}
              <span className="text-yellow-500 mr-4">${_data?.price}</span>
              {/* <Tag color="red">64% Off</Tag> */}
            </div>
            <span className="text-[18px]">
              Remaining: <span className="font-bold">{_data?.amount}</span>
            </span>
          </div>
          <Divider />
          <Typography.Paragraph>{_data?.description}</Typography.Paragraph>

          <p>
            <span className="font-bold">Category:</span> {_data?.categories?.name}
          </p>
          <div className="flex absolute bottom-0">
            <Button className="mr-4">Change information</Button>
            <Popconfirm title="Do you want to delete the products?">
              <div className="cursor-pointer bg-red-500 text-white flex items-center px-4 rounded-[6px] duration-200  hover:bg-red-600">
                <DeleteFilled className="mr-2" /> Delete
              </div>
            </Popconfirm>
          </div>
        </div>
      </div>
    </Show>
  );
};
