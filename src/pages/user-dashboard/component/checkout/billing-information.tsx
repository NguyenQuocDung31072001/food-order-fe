import { Form, Input } from 'antd';

export const BilingInformation: React.FC = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="flex justify-between">
          <Form.Item label="Full name" name="fullname" required>
            <Input
              placeholder="Your name"
              style={{
                width: 250,
                marginRight: 20,
              }}
            />
          </Form.Item>
          <Form.Item label="User name" name="username" required>
            <Input
              placeholder="Your username"
              style={{
                width: 250,
                marginRight: 20,
              }}
            />
          </Form.Item>
        </div>

        <div className="flex justify-between">
          <Form.Item label="Province" name="province" required>
            <Input
              placeholder="Your province"
              style={{
                width: 250,
                marginRight: 20,
              }}
            />
          </Form.Item>
          <Form.Item label="Ward" name="ward" required>
            <Input
              placeholder="Your ward"
              style={{
                width: 250,
                marginRight: 20,
              }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Company name (optional)" name="company_name">
          <Input
            placeholder="Company name"
            style={{
              width: 200,
              marginRight: 20,
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label="Detail Address" name="recent_address" required>
        <Input
          placeholder="Detail Address"
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <div className="flex justify-between">
        <Form.Item label="Email" name="email" required>
          <Input
            placeholder="Email Address"
            style={{
              width: 250,
            }}
          />
        </Form.Item>
        <Form.Item label="Phone" name="phone" required>
          <Input
            placeholder="Phone number"
            style={{
              width: 250,
            }}
          />
        </Form.Item>
      </div>
      <Form.Item label="Order notes" name="order_notes">
        <Input.TextArea placeholder="Order notes" className="w-full" rows={4} />
      </Form.Item>
    </>
  );
};
