import { IResourceComponentsProps } from '@refinedev/core';
import { Create, useForm } from '@refinedev/antd';
import { Form, Input, Row, Col } from 'antd';
import { LineSelect } from './component/LineSelect';

export const BrandCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<any>({});

  return (
    <Create isLoading={queryResult?.isFetching} saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          isActive: true,
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
    </Create>
  );
};
