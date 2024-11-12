import { Show } from '@refinedev/antd';
import { ImageCarousel } from './component/image-carousel';
import { Button, Divider, Popconfirm, Rate, Spin, Tag, Typography } from 'antd';
import { useDelete, useNavigation, useOne, useParsed } from '@refinedev/core';
import { ArrowLeftOutlined, DeleteFilled } from '@ant-design/icons';
import { PATH_NAME_ADMIN } from 'constant/path-route';

export const ProductShow: React.FC = () => {
  const { push } = useNavigation();
  const { id } = useParsed();
  const { data, isLoading } = useOne({
    resource: 'foods',
    id: id,
  });
  const _data = data?.data;

  const { mutateAsync: handleDeleteFood, isLoading: isLoadingDelete } = useDelete();
  const handleDelete = async () => {
    if (!id) return;

    await handleDeleteFood({
      resource: 'foods',
      id: id,
    });
    push(PATH_NAME_ADMIN.PRODUCTS.INDEX);
  };
  return (
    <Spin spinning={isLoading || isLoadingDelete}>
      <div className="p-4 bg-white">
        <div className="flex items-center">
          <Button
            style={{ height: 24 }}
            onClick={() => {
              push(PATH_NAME_ADMIN.PRODUCTS.INDEX);
            }}
          >
            <ArrowLeftOutlined />
          </Button>
          <p className="m-0">Product Detail</p>
        </div>
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
              <Popconfirm title="Do you want to delete the products?" onConfirm={handleDelete}>
                <div className="cursor-pointer bg-red-500 text-white flex items-center px-4 rounded-[6px] duration-200  hover:bg-red-600">
                  <DeleteFilled className="mr-2" /> Delete
                </div>
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </Spin>
  );
};
