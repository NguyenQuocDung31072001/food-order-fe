import { useList } from '@refinedev/core';
import { Form, Select } from 'antd';
import { FormInstance } from 'antd/lib';

type CategoriesSelectProps = {
  form: FormInstance<{}>;
};
export const CategoriesSelect: React.FC<CategoriesSelectProps> = ({ form }) => {
  const { data, isLoading } = useList({
    resource: 'categories',
  });
  const options = data?.data?.map((category) => ({
    label: category.name,
    value: category.id,
    image: category.image,
  }));

  return (
    <Form.Item
      label="Category"
      name="category"
      required
      rules={[
        {
          message: 'Please input category',
          required: true,
        },
      ]}
    >
      <Select
        showSearch
        loading={isLoading}
        placeholder="Category"
        options={options}
        optionRender={(option: any) => {
          const { label, image } = option?.data ?? {};
          return (
            <div className="flex  items-center justify-between">
              {label}
              <img src={image} alt="" className="w-8 h-8 rounded-[10px]" />
            </div>
          );
        }}
      />
    </Form.Item>
  );
};
