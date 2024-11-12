import {
  DeleteFilled,
  DeleteOutlined,
  DownOutlined,
  LoadingOutlined,
  PlusOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { useApiUrl, useDelete } from '@refinedev/core';
import { Button, Upload } from 'antd';
import { UploadProps } from 'antd/lib';
import React from 'react';

const ITEM_SPACE = 100;
const ITEM_SIZE = 5;
const ITEM_JUMP = 2;

type ImageCarouselProps = {
  imageLists: ImageListType[];
  setImageLists: React.Dispatch<React.SetStateAction<ImageListType[]>>;
};
export type ImageListType = {
  url: string;
  public_id: string;
};
export const ImageCarouselCreate: React.FC<ImageCarouselProps> = ({ imageLists, setImageLists }) => {
  const [imageSelected, setImageSelected] = React.useState<ImageListType>();
  const [translateY, setTranslateY] = React.useState(0);

  const apiUrl = useApiUrl();

  const [loading, setLoading] = React.useState(false);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const { url, public_id } = info.file.response;
      setImageLists([
        {
          url: url,
          public_id: public_id,
        },
        ...imageLists,
      ]);
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const { mutateAsync: mutateAsyncDelete } = useDelete();
  const handleDeleteImage = async (publicId: string) => {
    await mutateAsyncDelete({
      resource: 'image',
      id: publicId,
    });
  };
  const handleClickDelete = (e: any, publicId: string) => {
    e.stopPropagation();
    handleDeleteImage(publicId);
    setImageLists(imageLists.filter((image) => image.public_id !== publicId));
  };

  return (
    <div className="w-full flex">
      <div className="w-[20%] flex flex-col justify-center items-center ">
        <Button
          type="text"
          style={{ background: 'transparent' }}
          className="p-0 h-4 my-2"
          disabled={translateY === 0}
          onClick={() => setTranslateY(translateY + ITEM_SPACE * ITEM_JUMP)}
        >
          <UpOutlined className="text-[18px]" />
        </Button>
        <div className={`h-[${ITEM_SPACE * ITEM_SIZE}px] overflow-hidden`}>
          <div
            style={{
              transform: `translateY(${translateY}px)`,
            }}
            className="duration-300"
          >
            <Upload
              name="file"
              listType="picture-card"
              accept="image/*"
              showUploadList={false}
              action={`${apiUrl}/image/upload`}
              onChange={handleChange}
            >
              {uploadButton}
            </Upload>
            {imageLists.map((image) => (
              <div
                key={image.public_id}
                style={{ borderColor: imageSelected?.public_id === image.public_id ? '#16a34a' : '' }}
                className={`relative overflow-hidden w-[${ITEM_SPACE}px] h-[${ITEM_SPACE}px] rounded-[4px] border-[2px] border-solid  border-white hover:border-green-400 my-1 cursor-pointer`}
                onClick={() => {
                  setImageSelected(image);
                }}
              >
                <DeleteOutlined
                  className="absolute text-red-500 top-0 right-0 "
                  onClick={(e) => handleClickDelete(e, image.public_id)}
                />
                <img className="w-full  h-20 p-1" src={image.url} />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="text"
          style={{ background: 'transparent' }}
          className="p-0 h-4 my-2"
          disabled={Math.abs(translateY) + ITEM_SPACE * ITEM_SIZE >= imageLists.length * ITEM_SPACE}
          onClick={() => setTranslateY(translateY - ITEM_SPACE * ITEM_JUMP)}
        >
          <DownOutlined className="text-[18px]" />
        </Button>
      </div>
      <div className="w-[80%] flex items-center">
        <img className="w-[100%] h-[500px] object-cover" src={imageSelected?.url} />
      </div>
    </div>
  );
};
