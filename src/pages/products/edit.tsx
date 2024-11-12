import { Create, useForm } from '@refinedev/antd';
import { Button, Form, Input, InputNumber, Select, Spin } from 'antd';
import { ImageCarouselCreate, ImageListType } from './component/image-carousel-create';
import { useApiUrl, useCreate, useCustomMutation, useOne, useParsed, useUpdate } from '@refinedev/core';
import { CategoriesSelect } from './component/form/categories-select';
import React from 'react';
import { ImageCarouselEdit } from './component/image-carousel-edit';

export const ProductEdit: React.FC = () => {
  const [imageLists, setImageLists] = React.useState<ImageListType[]>([]);
  const [exitingPublicId, setExitingPublicId] = React.useState<string[]>([]);
  const { form } = useForm();

  const { mutateAsync: mutateAsyncFood, isLoading: isLoadingCreateFood } = useCustomMutation();
  const { mutateAsync: mutateAsyncImageFood, isLoading: isLoadingCreateImageFood } = useCreate();

  const { id } = useParsed();
  const { data, isLoading, refetch } = useOne({
    resource: 'foods',
    id: id,
    queryOptions: {
      onSuccess: (data) => {
        const _data = data?.data ?? {};
        form.setFieldsValue({
          name: _data?.name,
          price: _data?.price,
          quantity: _data?.amount,
          description: _data?.description,
          category: _data?.categories_id,
        });
        setImageLists((_data?.imageFoods ?? [])?.map((i: any) => ({ public_id: i.image_public_id, url: i.image })));
        setExitingPublicId((_data?.imageFoods ?? [])?.map((i: any) => i.image_public_id));
      },
    },
  });

  const apiUrl = useApiUrl();
  const handleSubmit = (e: any) => {
    console.log({ e });
    const resource = `${apiUrl}/foods/${id}` as string;
    mutateAsyncFood({
      method: 'patch',
      url: resource,
      values: {
        name: e.name,
        price: e.price,
        amount: e.quantity,
        description: e.description,
        categories_id: e.category,
        categories: e.category,
      },
    }).then(async (res) => {
      const _data = res.data;
      const id = _data?.id;
      const _imageListToCreate = imageLists.filter((i) => !exitingPublicId.includes(i.public_id));
      for (const image of _imageListToCreate) {
        await mutateAsyncImageFood({
          resource: 'image-food',
          values: {
            food_id: id,
            food: id,
            image_public_id: image.public_id,
            image: image.url,
          },
        });
      }
      refetch();
    });
  };
  return (
    <Create
      title="Edit Product"
      saveButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >
      <Spin spinning={isLoading || isLoadingCreateFood || isLoadingCreateImageFood}>
        <Form name="create-food" layout="vertical" form={form} onFinish={handleSubmit}>
          <div className="flex justify-between ">
            <div className="w-[45%]">
              <ImageCarouselEdit
                imageLists={imageLists}
                setImageLists={setImageLists}
                food_id={data?.data?.id as string}
              />
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
                      width: 250,
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
                      width: 250,
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
              Update Product
            </Button>
          </div>
        </Form>
      </Spin>
    </Create>
  );
};
