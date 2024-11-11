import { useForm } from '@refinedev/antd';
import { Divider, Form, Input, Modal, Radio, Space } from 'antd';
import { useState } from 'react';

const data = Array(10)
  .fill(0)
  .map((_, index) => {
    return {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
      name: 'food example ' + index,
      price: 400,
      amount: 23,
    };
  });

export const ModalCheckout: React.FC = () => {
  const { form } = useForm();
  const [open, setOpen] = useState(false);

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
            <div className="flex flex-wrap">
              <Form.Item label="First name" name="first_name">
                <Input
                  placeholder="Your first name"
                  style={{
                    width: 200,
                    marginRight: 20,
                  }}
                />
              </Form.Item>
              <Form.Item label="Last name" name="last_name">
                <Input
                  placeholder="Your last name"
                  style={{
                    width: 200,
                    marginRight: 20,
                  }}
                />
              </Form.Item>
              <Form.Item label="Company name (optional)" name="company_name">
                <Input
                  placeholder="Company name"
                  style={{
                    width: 200,
                    marginRight: 20,
                  }}
                />
              </Form.Item>
              <Form.Item label="Province" name="province">
                <Input
                  placeholder="Your province"
                  style={{
                    width: 200,
                    marginRight: 20,
                  }}
                />
              </Form.Item>
              <Form.Item label="Ward" name="ward">
                <Input
                  placeholder="Your ward"
                  style={{
                    width: 200,
                    marginRight: 20,
                  }}
                />
              </Form.Item>
            </div>
            <Form.Item label="Detail Address" name="detail_address">
              <Input
                placeholder="Detail Address"
                style={{
                  width: '100%',
                }}
              />
            </Form.Item>
            <div className="flex justify-between">
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Email Address"
                  style={{
                    width: 200,
                  }}
                />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input
                  placeholder="Phone number"
                  style={{
                    width: 200,
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className="p-4 border-[1px] border-solid border-gray-300 rounded-[10px] w-[45%]">
            <p>Order Summary</p>
            <div className="h-[200px] overflow-y-scroll ">
              {data.map((item, index) => {
                return (
                  <div key={item.name + index} className="flex items-center justify-between my-2">
                    <div className="flex items-center ">
                      <img src={item.image} className="w-10 h-10 rounded-full mr-2" />
                      <span>
                        {item.name} <span className="ml-2">x{item.amount}</span>
                      </span>
                    </div>
                    <span>${item.price}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal:</span>
              <span>$84.00</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping:</span>
              <span>Free</span>
            </div>
            <Divider className="my-1" />
            <div className="flex justify-between">
              <span className="text-gray-500">Total:</span>
              <span className="font-semibold text-[18px]">$84.00</span>
            </div>
            <div>
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
            {/* <div className="flex justify-center">
            </div> */}
          </div>
        </Form>
      </Modal>
    </div>
  );
};
