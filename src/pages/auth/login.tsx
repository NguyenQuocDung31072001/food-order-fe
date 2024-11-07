import { useForm } from '@refinedev/antd';
import { useNavigation } from '@refinedev/core';
import { Button, Checkbox, Form, Input } from 'antd';

export const LoginPage: React.FC<{}> = () => {
  const { form } = useForm();
  const { replace } = useNavigation();

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-600 flex  items-center justify-center">
      <div className="w-[500px] h-[600px] bg-white rounded-[10px] flex flex-col items-center justify-center">
        <p className="text-[24px] font-bold">Login to Account</p>
        <span>Please enter your email and password to continue</span>
        <Form form={form} name="login" layout="vertical" className="w-[80%] mt-8">
          <Form.Item
            label="Email address"
            name="email"
            required
            rules={[{ required: true, message: 'Email is required!' }]}
          >
            <Input placeholder="example@gmail.com" />
          </Form.Item>
          <div className="relative">
            <Form.Item
              label="Password"
              name="password"
              required
              rules={[{ required: true, message: 'Password is required!' }]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <span className="absolute top-0 right-0 text-gray-500">Forget Password?</span>
          </div>

          <Form.Item valuePropName="checked">
            <Checkbox>Remember Password</Checkbox>
          </Form.Item>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-yellow-400 hover:bg-yellow-500 duration-300 text-white px-2 py-3  rounded-[10px] w-[300px] flex justify-center cursor-pointer">
              Sign in
            </div>
            <span className="mt-6 text-gray-600">
              Don’t have an account?
              <span
                className="text-yellow-500 cursor-pointer ml-1 underline hover:text-yellow-600 duration-300"
                onClick={() => {
                  replace('/register');
                }}
              >
                Create Account
              </span>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};
