import { css } from '@emotion/react';
import { Form, Tabs } from 'antd';
import { TabsProps } from 'antd/lib';
import { CustomerProfile } from './component/customer-profile';
import { CustomerSecurity } from './component/customer-security';
import { useForm } from '@refinedev/antd';
import { useOne, useUpdate } from '@refinedev/core';
import { getTokenInfo } from 'utils/get-token-info';
import dayjs from 'dayjs';

export const CustomerSettingAccountList = () => {
  const { form } = useForm();

  const { userId } = getTokenInfo();
  useOne({
    resource: 'customer',
    id: userId,
    queryOptions: {
      onSuccess: (data) => {
        console.log('data', data?.data);
        const _data = {
          ...data?.data,
          date_of_birth: dayjs(data?.data?.date_of_birth),
        };
        form.setFieldsValue(_data);
      },
    },
  });

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
  const { mutateAsync } = useUpdate();
  const handleFinish = async (values: any) => {
    if (!userId) return;
    await mutateAsync({
      resource: 'customer',
      values: {
        ...values,
      },
      id: userId,
    });
    console.log('values ', values);
  };
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
      <Form name="profile-information" layout="vertical" onFinish={handleFinish} form={form}>
        <Tabs defaultActiveKey="1" items={items} />
        <div className="flex justify-end w-full ">
          <div className="w-[20%] flex">
            <div
              className="bg-yellow-500 text-white py-2 px-12 rounded-[10px] hover:bg-yellow-600 cursor-pointer duration-300"
              onClick={() => form.submit()}
            >
              Save
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
