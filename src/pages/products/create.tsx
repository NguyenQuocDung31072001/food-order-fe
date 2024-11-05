import { Create } from '@refinedev/antd';
import { Button, Divider, Rate, Tag, Typography } from 'antd';
import { ImageCarousel } from './component/image-carousel';

export const ProductCreate: React.FC = () => {
  return (
    <Create>
      <h1>Product Create</h1>
      <div className="flex ">
        <div className="w-[50%]">
          <ImageCarousel />
        </div>
        <div className="w-[50%]">
          <Typography.Title>
            Chinese Cabbage <Tag color="green">in Stock</Tag>
          </Typography.Title>
          <div>
            <Rate allowHalf defaultValue={2.5} />
            <span>8 Review</span>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <span className="text-gray-500 line-through">$48.00</span>
              <span className="text-yellow-500">$17.28</span>
              <Tag color="red">64% Off</Tag>
            </div>
            <span>Remaining: 23</span>
          </div>
          <Divider />
          <p className="text-gray-300">
            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam,
            blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar.
          </p>
          <p>
            <span className="font-bold">Category:</span> Vegetables
          </p>
          <div className="flex">
            <Button>Change information</Button>
            <Button className="bg-violet-700 text-white hover:bg-violet-800 hover:text-white">Disable</Button>
            <Button className="bg-red-500 text-white">Delete</Button>
          </div>
        </div>
      </div>
    </Create>
  );
};
