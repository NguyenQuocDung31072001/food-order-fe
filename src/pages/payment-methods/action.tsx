import { Button, Modal } from 'antd';
import React from 'react';
import { ActionModalContent } from './action-modal-content';

type PaymentMethodActionProps = {
  buttonLabel: string | React.ReactNode;
  modalTitle: string;
  id?: string;
  refetchList?: () => void;
};
export const PaymentMethodAction: React.FC<PaymentMethodActionProps> = ({
  buttonLabel,
  modalTitle,
  id,
  refetchList,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="flex justify-end ">
        <Button type={id ? 'text' : 'primary'} onClick={() => setOpen(true)}>
          {buttonLabel}
        </Button>
      </div>
      <Modal title={modalTitle} open={open} onCancel={() => setOpen(false)} footer={null} destroyOnClose>
        <ActionModalContent id={id} setOpen={setOpen} refetchList={refetchList} />
      </Modal>
    </>
  );
};
