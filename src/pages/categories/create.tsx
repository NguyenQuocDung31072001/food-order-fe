import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Create, useForm } from '@refinedev/antd';
import { useApiUrl, useCreate, useDelete, useNavigation } from '@refinedev/core';
import { Button, Form, Image, Input, Spin, Upload } from 'antd';
import { UploadProps } from 'antd/lib';
import { PATH_NAME_ADMIN } from 'constant/path-route';
import React from 'react';

export const CategoriesCreate: React.FC = () => {
  const { push } = useNavigation();

  const { form } = useForm();
  const apiUrl = useApiUrl();

  const [image, setImage] = React.useState<{ url: string; public_id: string }>();

  const [loading, setLoading] = React.useState(false);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const { url, public_id } = info.file.response;
      setImage({ url: url, public_id: public_id });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const { mutateAsync, isLoading } = useCreate();
  const handleFinish = async (e: any) => {
    mutateAsync({
      resource: 'categories',
      values: {
        name: e.name,
        image: image?.url,
        image_public_id: image?.public_id,
      },
    }).then(() => {
      push(PATH_NAME_ADMIN.CATEGORIES.INDEX);
    });
  };
  return (
    <Create
      saveButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >
      <Spin spinning={isLoading}>
        <Form name="categories-create" form={form} onFinish={handleFinish}>
          <div className="flex flex-col">
            <Form.Item
              label="Name"
              name="name"
              required
              rules={[
                {
                  message: 'Name is required',
                  required: true,
                },
              ]}
            >
              <Input
                placeholder="Name"
                style={{
                  width: 300,
                }}
              />
            </Form.Item>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action={`${apiUrl}/image/upload`}
              onChange={handleChange}
            >
              {image ? <img src={image.url} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={() => {
                form.submit();
              }}
            >
              Create
            </Button>
          </div>
        </Form>
      </Spin>
    </Create>
  );
};
