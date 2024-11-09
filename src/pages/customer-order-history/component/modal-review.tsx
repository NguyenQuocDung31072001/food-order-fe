import { Input, Modal, Rate } from 'antd';
import React from 'react';

export const ModalReview: React.FC<{ record: any }> = ({ record }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <div
        className="px-4 py-2 text-white bg-yellow-500 hover:bg-yellow-600 duration-300  rounded-[10px] cursor-pointer"
        onClick={() => {
          setOpen(true);
        }}
      >
        Review
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={() => {
          return (
            <div className="flex justify-end">
              <div
                className="text-white bg-yellow-400 rounded-[10px] py-2 px-4 cursor-pointer hover:bg-yellow-500"
                onClick={() => setOpen(false)}
              >
                Done
              </div>
            </div>
          );
        }}
      >
        <div className="p-2">
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              <img src={record.image} className="w-16 h-16 rounded-[10px]" />
              <span className="ml-6">{record.name}</span>
            </div>
            <span>${record.price}</span>
            <span>x{record.quantity}</span>
            <span>${record.subtotal}</span>
          </div>
          <div className="flex w-full justify-center mt-4">
            <Rate className="text-orange-500 text-[24px]" />
          </div>
          <div className="my-8">
            Review
            <Input.TextArea placeholder="Review" />
          </div>
        </div>
      </Modal>
    </div>
  );
};
