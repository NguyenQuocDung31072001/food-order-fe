import { css } from '@emotion/react';
import { useForm } from '@refinedev/antd';
import { Divider, Form, Modal, Radio, Space } from 'antd';
import { useGetCartItems } from 'hooks/use-get-cart-items';
import { useState } from 'react';
import { BilingInformation } from './billing-information';
import { getTokenInfo } from 'utils/get-token-info';
import { useCreate, useList, useOne } from '@refinedev/core';

export const ModalCheckout: React.FC<{ refetch: any }> = ({ refetch }) => {
  const { userId } = getTokenInfo();
  const { form } = useForm();

  const { data: paymentMethodData } = useList({
    resource: 'payment-methods',
  });

  useOne({
    resource: 'customer',
    id: userId,
    queryOptions: {
      enabled: true,
      onSuccess: (data) => {
        const _data = data?.data ?? {};
        form.setFieldsValue(_data);
      },
    },
  });

  const [open, setOpen] = useState(false);

  const { data, totalPrice } = useGetCartItems();

  const { mutateAsync: createOrder } = useCreate();

  const handleFinish = async (values: any) => {
    const { userId } = getTokenInfo();
    const orderPayload = {
      customer_id: userId,
      voucher_id: null,
      carts: data?.map((item) => item?.id) ?? [],
      ...values,
    };
    await createOrder({
      resource: 'order',
      values: orderPayload,
    });
    setOpen(false);
    refetch();
  };
  return (
    <div>
      <div
        className="w-full bg-yellow-500 text-white flex items-center justify-center py-3 px-8 rounded-[10px] cursor-pointer hover:bg-yellow-600 duration-300"
        onClick={() => setOpen(true)}
      >
        Checkout
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} width={1200} centered footer={null}>
        <Form
          name="modal-checkout"
          form={form}
          layout="vertical"
          className="p-4 flex justify-between"
          onFinish={handleFinish}
        >
          <div className="w-[50%] pr-10 max-h-[500px] overflow-y-scroll">
            <p className="font-bold text-[18px] sticky top-0 bg-white z-50">Billing Information</p>
            <BilingInformation />
          </div>
          <div className="p-4 border-[1px] border-solid border-gray-300 rounded-[10px] w-[45%]">
            <p className="font-bold">Order Summary</p>
            <div className="max-h-[200px] overflow-y-scroll mb-4">
              {data.map((item) => {
                return (
                  <div key={item.id} className="flex items-center justify-between my-2">
                    <div className="flex items-center ">
                      <img src={item.image} className="w-10 h-10 rounded-full mr-2" />
                      <span>
                        {item.name}{' '}
                        <span className="ml-2">
                          <span className="font-medium">x</span>
                          {item.quantity}
                        </span>
                      </span>
                    </div>
                    <span>${item.price}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <span>${totalPrice}</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping:</span>
              <span>Free</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between">
              <span className="text-gray-500">Total:</span>
              <span className="font-semibold text-[18px]">${totalPrice}</span>
            </div>
            <div
              className="mb-4"
              css={css`
                .ant-radio-checked {
                  .ant-radio-inner {
                    border-color: #fadb14;
                    background-color: #fadb14;
                  }
                }
              `}
            >
              <p>Payment Method</p>
              <Form.Item name={'payment_method_id'} required>
                <Radio.Group>
                  <Space direction="vertical">
                    {paymentMethodData?.data?.map((item) => {
                      return (
                        <Radio key={item.id} value={item.id}>
                          {item?.name}
                        </Radio>
                      );
                    })}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>
            <div
              className="py-2 px-4 bg-yellow-500 hover:bg-yellow-500 cursor-pointer rounded-[10px] text-white duration-300 text-center"
              onClick={() => form.submit()}
            >
              Place Order
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
