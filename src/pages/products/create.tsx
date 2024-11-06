import { Create, useForm } from '@refinedev/antd';
import { Button, Form, Input, InputNumber, Select, Spin } from 'antd';
import { ImageCarouselCreate } from './component/image-carousel-create';
import { useCreate } from '@refinedev/core';

export const ProductCreate: React.FC = () => {
  const { form } = useForm();
  const { mutateAsync, isLoading } = useCreate();

  const handleSubmit = (e: any) => {
    console.log({ e });
    mutateAsync({
      resource: 'foods',
      values: {
        name: e.name,
        price: e.price,
        amount: e.quantity,
        description: e.description,
        categories_id: '',
        categories: e.category,
      },
    });
  };
  return (
    <Create
      title="Create Product"
      saveButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >
      <Spin spinning={isLoading}>
        <Form name="create-food" layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="flex justify-between ">
            <div className="w-[45%]">
              <ImageCarouselCreate />
            </div>
            <div className="w-[50%] mr-8">
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[
                  {
                    message: 'Please input name',
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Please input name" size="large" />
              </Form.Item>

              <div className="flex justify-between">
                <Form.Item
                  label="Price"
                  name="price"
                  required
                  rules={[
                    {
                      message: 'Please input price',
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Price"
                    min={0}
                    style={{
                      width: 200,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  required
                  rules={[
                    {
                      message: 'Please input quantity',
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Quantity"
                    min={0}
                    style={{
                      width: 200,
                    }}
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="Description"
                name="description"
                required
                rules={[
                  {
                    message: 'Please input description',
                    required: true,
                  },
                ]}
              >
                <Input.TextArea placeholder="Description" />
              </Form.Item>
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
                  placeholder="Category"
                  options={[
                    {
                      label: 'Vegetables',
                      value: 'vegetables',
                    },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="primary" onClick={() => form.submit()}>
              Create Product
            </Button>
          </div>
        </Form>
      </Spin>
    </Create>
  );
};
