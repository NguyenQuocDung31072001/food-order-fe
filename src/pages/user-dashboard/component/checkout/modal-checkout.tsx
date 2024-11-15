import { css } from '@emotion/react';
import { useForm } from '@refinedev/antd';
import { Divider, Form, Modal, Radio, Space } from 'antd';
import { useGetCartItems } from 'hooks/use-get-cart-items';
import { useState } from 'react';
import { BilingInformation } from './billing-information';

export const ModalCheckout: React.FC = () => {
  const { form } = useForm();
  const [open, setOpen] = useState(false);

  const { data, totalPrice } = useGetCartItems();

  return (
    <div>
      <div
        className="w-full bg-yellow-500 text-white flex items-center justify-center py-3 px-8 rounded-[10px] cursor-pointer hover:bg-yellow-600 duration-300"
        onClick={() => setOpen(true)}
      >
        Checkout
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} width={1000} centered footer={null}>
        <Form name="modal-checkout" form={form} layout="vertical" className="p-4 flex">
          <div className="w-[55%] pr-10">
            <p className="font-bold text-[18px]">Billing Information</p>
            <BilingInformation />
          </div>
          <div className="p-4 border-[1px] border-solid border-gray-300 rounded-[10px] w-[45%]">
            <p className="font-bold">Order Summary</p>
            <div className="max-h-[200px] overflow-y-scroll mb-4">
              {data.map((item, index) => {
                return (
                  <div key={item.name + index} className="flex items-center justify-between my-2">
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
              <Radio.Group defaultValue={'cash_on_delivery'}>
                <Space direction="vertical">
                  <Radio value={'cash_on_delivery'}>Cash on Delivery</Radio>
                  <Radio value={'internet banking'}>Internet banking</Radio>
                  <Radio value={'momo'}>Momo</Radio>
                </Space>
              </Radio.Group>
            </div>
            <div className="py-2 px-4 bg-yellow-500 hover:bg-yellow-500 cursor-pointer rounded-[10px] text-white duration-300 text-center">
              Place Order
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
