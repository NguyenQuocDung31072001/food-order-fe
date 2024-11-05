import { useList } from '@refinedev/core';
import { Form, Select } from 'antd';
import { useParams } from 'react-router-dom';

export const LineSelect: React.FC<any> = () => {
  const params = useParams();

  const { data } = useList({
    resource: 'line',
    meta: {
      join: ['brand'],
    },
    pagination: {
      pageSize: 100,
    },
  });
  const linesOptions = data?.data?.map((line: any) => {
    const isDisable = !!line.brand?.id && line.brand?.id?.toString() !== params.id?.toString();
    return {
      label: isDisable ? `${line.name} - ${line.brand?.name}` : line.name,
      value: line.id,
      disabled: isDisable,
    };
  });

  return (
    <Form.Item label={'Lines'} name="lines">
      <Select mode="multiple" options={linesOptions} />
    </Form.Item>
  );
};
