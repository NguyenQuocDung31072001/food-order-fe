import { Form, Input } from 'antd';

export const BilingInformation: React.FC = () => {
  return (
    <>
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
    </>
  );
};
