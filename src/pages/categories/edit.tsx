import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Edit, useForm } from '@refinedev/antd';
import { useApiUrl, useOne, useParsed, useUpdate } from '@refinedev/core';
import { Button, Form, Input, Spin, Upload } from 'antd';
import { UploadProps } from 'antd/lib';
import React from 'react';

export const CategoriesEdit: React.FC = () => {
  const apiUrl = useApiUrl();
  const { id } = useParsed();
  const { form } = useForm({
    resource: '',
  });
  const { refetch } = useOne({
    resource: 'categories',
    id: id,
    queryOptions: {
      enabled: false,
      onSuccess: (data) => {
        form.setFieldsValue({
          name: data.data.name,
          image: data.data.image,
          image_public_url: data.data.image_public_url,
        });
      },
    },
  });

  React.useEffect(() => {
    refetch();
  }, []);

  const imageWatch = Form.useWatch('image', form);

  const [loading, setLoading] = React.useState(false);
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const { url, public_id } = info.file.response;
      form?.setFieldsValue({
        image: url,
        image_public_id: public_id,
      });
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const { mutateAsync, isLoading: isLoadingUpdate } = useUpdate();
  const handleFinish = async (e: any) => {
    await mutateAsync({
      resource: 'categories',
      id: id,
      values: { name: e.name, image: e?.image, image_public_id: e?.image_public_id },
    });
  };
  return (
    <Edit
      saveButtonProps={{
        style: {
          display: 'none',
        },
      }}
    >
      <Spin spinning={isLoadingUpdate || loading}>
        <Form name="categories-edit" form={form} onFinish={(e) => handleFinish(e)}>
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
              <Input placeholder="Name" style={{ width: 300 }} />
            </Form.Item>
            <Upload
              name="file"
              listType="picture-card"
              showUploadList={false}
              action={`${apiUrl}/image/upload`}
              onChange={handleChange}
            >
              {imageWatch ? <img src={imageWatch} alt="image" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
          </div>

          <Form.Item name="image" hidden />
          <Form.Item name="image_public_id" hidden />

          <div className="flex justify-end">
            <Button
              onClick={() => {
                form?.submit();
              }}
            >
              Save
            </Button>
          </div>
        </Form>
      </Spin>
    </Edit>
  );
};
