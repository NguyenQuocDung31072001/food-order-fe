import { useForm } from '@refinedev/antd';
import { useApiUrl, useCustomMutation, useOne } from '@refinedev/core';
import { Button, Form, Input } from 'antd';

export const ActionModalContent: React.FC<{
  id?: string;
  refetchList?: () => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, refetchList, setOpen }) => {
  const apiUrl = useApiUrl();
  const { form } = useForm();

  useOne({
    resource: 'payment-methods',
    id: id,
    queryOptions: {
      enabled: !!id,
      onSuccess: (data) => {
        form.setFieldValue('name', data?.data?.name);
      },
    },
  });

  const { mutateAsync, isLoading } = useCustomMutation();

  const handleOk = async (values: any) => {
    let method: 'post' | 'put' = 'post';
    let url = 'payment-methods';
    if (id) {
      method = 'put';
      url = `payment-methods/${id}`;
    }
    await mutateAsync({
      method: method,
      url: `${apiUrl}/${url}`,
      values,
    });
    if (refetchList) {
      refetchList?.();
    }
    setOpen(false);
  };
  return (
    <>
      <Form name="payment-method-create" form={form} onFinish={handleOk} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          required
          rules={[
            {
              required: true,
              message: 'Please input name!',
            },
          ]}
        >
          <Input placeholder="Payment method name" />
        </Form.Item>
      </Form>
      <div className="flex justify-end">
        <Button type="primary" onClick={form.submit}>
          {id ? 'Update' : 'Create'}
        </Button>
      </div>
    </>
  );
};
