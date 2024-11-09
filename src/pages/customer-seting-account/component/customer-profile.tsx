import { DatePicker, Form, FormInstance, Input } from 'antd';

export const CustomerProfile: React.FC<{ form: FormInstance<{}> }> = () => {
  return (
    <div className="flex w-full">
      <div className="w-[16%]">
        <img src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png" className="w-40 h-40 rounded-[50%]" />
      </div>
      <div className="w-[42%] px-2">
        <Form.Item label="Your Name" name="name">
          <Input
            placeholder="Dung nguyen"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input
            placeholder="dungnguyen@hihi.com"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Date of Birth" name="date_of_birth">
          <DatePicker
            placeholder="Date of Birth"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Permanent Address" name="permanent_address">
          <Input
            placeholder="Tan binh, Ho Chi Minh ..."
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Postal Code" name="postal_code">
          <Input
            placeholder="123456"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
      </div>
      <div className="w-[42%] px-2">
        <Form.Item label="User Name" name="user_name">
          <Input
            placeholder="dungnguyen"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password
            placeholder="password"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Present Address" name="present_address">
          <Input
            placeholder="Tan binh, Ho Chi Minh ..."
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="City" name="city">
          <Input
            placeholder="Ho Chi Minh"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input
            placeholder="Viet name"
            style={{
              width: 400,
            }}
          />
        </Form.Item>
      </div>
    </div>
  );
};
