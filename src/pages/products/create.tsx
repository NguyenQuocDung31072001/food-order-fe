import { Create, useForm } from '@refinedev/antd';
import { Button, Form, Input, InputNumber, Select, Spin } from 'antd';
import { ImageCarouselCreate, ImageListType } from './component/image-carousel-create';
import { useCreate } from '@refinedev/core';
import { CategoriesSelect } from './component/form/categories-select';
import React from 'react';

export const ProductCreate: React.FC = () => {
  const [imageLists, setImageLists] = React.useState<ImageListType[]>([]);
  const { form } = useForm();
  const { mutateAsync: mutateAsyncFood, isLoading: isLoadingCreateFood } = useCreate();
  const { mutateAsync: mutateAsyncImageFood, isLoading: isLoadingCreateImageFood } = useCreate();

  const handleSubmit = (e: any) => {
    console.log({ e });
    mutateAsyncFood({
      resource: 'foods',
      values: {
        name: e.name,
        price: e.price,
        amount: e.quantity,
        description: e.description,
        categories_id: e.category,
        categories: e.category,
      },
    }).then((res) => {
      console.log({ res });
      const _data = res.data;
      const id = _data?.id;
      for (const image of imageLists) {
        mutateAsyncImageFood({
          resource: 'image-food',
          values: {
            food_id: id,
            food: id,
            image_public_id: image.public_id,
            image: image.url,
          },
        });
      }
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
      <Spin spinning={isLoadingCreateFood || isLoadingCreateImageFood}>
        <Form name="create-food" layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="flex justify-between ">
            <div className="w-[45%]">
              <ImageCarouselCreate imageLists={imageLists} setImageLists={setImageLists} />
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
              <CategoriesSelect form={form} />
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
