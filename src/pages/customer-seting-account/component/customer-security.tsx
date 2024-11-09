import { css } from '@emotion/react';
import { Checkbox, Form, FormInstance, Input, Switch } from 'antd';

export const CustomerSecurity: React.FC<{ form: FormInstance<{}> }> = () => {
  return (
    <div className="py-8">
      <p>Two-factor Authentication</p>
      <Form.Item
        label=""
        valuePropName="checked"
        css={css`
          .ant-switch-checked {
            background: #eab308 !important;
          }
        `}
      >
        <Switch defaultChecked />
        <span className="text-gray-500 text-[12px] ml-8">Enable or disable two factor authentication</span>
      </Form.Item>
      <p className="text-[18px]">Change Password</p>
      <Form.Item label="Current Password">
        <Input.Password
          placeholder="******"
          style={{
            width: 400,
          }}
        />
      </Form.Item>
      <Form.Item label="New Password">
        <Input.Password
          placeholder="******"
          style={{
            width: 400,
          }}
        />
      </Form.Item>
    </div>
  );
};
