import { IResourceComponentsProps } from '@refinedev/core';
import { Edit, useForm } from '@refinedev/antd';
import { Form, Input, Row, Col, Select } from 'antd';
import { LineSelect } from './component/LineSelect';

export const BrandEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: 'brand',
    action: 'edit',
    meta: {
      join: ['lines'],
    },
  });

  return (
    <Edit isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
          ...formProps.initialValues,
          lines: formProps.initialValues?.lines?.map((line: any) => line.id),
        }}
        onFinish={(e: any) => {
          const payload = {
            ...e,
            lines: (e.lines || []).map((line: any) => {
              return {
                id: line,
              };
            }),
          };
          formProps.onFinish?.(payload);
        }}
      >
        <Row gutter={[64, 0]} wrap>
          <Col xs={24} lg={8}>
            <Form.Item
              label={'Name'}
              name="name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={'Code'}
              name="code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <LineSelect />
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
