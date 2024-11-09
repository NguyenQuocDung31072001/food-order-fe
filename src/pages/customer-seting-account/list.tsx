import { css } from '@emotion/react';
import { Form, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import { CustomerProfile } from './component/customer-profile';
import { CustomerSecurity } from './component/customer-security';
import { useForm } from '@refinedev/antd';

export const CustomerSettingAccountList = () => {
  const { form } = useForm();

  const items: TabsProps['items'] = [
    {
      key: 'edit-profile',
      label: <span className="font-bold text-gray-400">Edit Profile</span>,
      children: <CustomerProfile form={form} />,
    },
    {
      key: 'security',
      label: <span className="font-bold text-gray-400">Security</span>,
      children: <CustomerSecurity form={form} />,
    },
  ];

  return (
    <div
      className="pt-10"
      css={css`
        .ant-tabs-ink-bar {
          background-color: #eab308 !important;
        }
        .ant-tabs-tab {
          min-width: 100px;
          display: flex;
          justify-content: center;
        }
        .ant-tabs-tab-active {
          span {
            color: #eab308 !important;
          }
        }
      `}
    >
      <Form name="profile-information" layout="vertical">
        <Tabs defaultActiveKey="1" items={items} />
        <div className="flex justify-end w-full ">
          <div className="w-[20%] flex">
            <div className="bg-yellow-500 text-white py-2 px-12 rounded-[10px] hover:bg-yellow-600 cursor-pointer duration-300">
              Save
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
