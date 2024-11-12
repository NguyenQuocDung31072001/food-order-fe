import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

// const imageList = [
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856373/ff5mrlofnw90v9mbqmbt.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856512/kn8iveigpuyurji1rvuk.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856266/ycxtwqivwqyncx1fuhlf.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856329/zgiirlv3cgdhvhfxwwmw.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856159/oys6h4blszsginrfgzxb.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856512/kn8iveigpuyurji1rvuk.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856266/ycxtwqivwqyncx1fuhlf.jpg',
//   'https://res.cloudinary.com/dcrjho9el/image/upload/v1685856329/zgiirlv3cgdhvhfxwwmw.jpg',
// ];
const ITEM_SPACE = 100;
const ITEM_SIZE = 5;
const ITEM_JUMP = 2;
const generateKey = (pre: string, index: number) => {
  return `${pre}_${index}`;
};
type ImageCarouselProps = {
  imageLists: string[];
};
export const ImageCarousel: React.FC<ImageCarouselProps> = ({ imageLists }) => {
  const [imageSelected, setImageSelected] = React.useState(imageLists[0]);
  const [imageKey, setImageKey] = React.useState(generateKey(imageSelected, 0));
  const [translateY, setTranslateY] = React.useState(0);

  React.useEffect(() => {
    if (imageLists.length === 0) return;
    setImageSelected(imageLists[0]);
  }, [imageLists]);
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
            {imageLists.map((image, index) => (
              <div
                key={generateKey(image, index)}
                style={{ borderColor: imageKey === generateKey(image, index) ? '#16a34a' : '' }}
                className={`overflow-hidden w-[${ITEM_SPACE}px] h-[${ITEM_SPACE}px] rounded-[4px] border-[2px] border-solid  border-white hover:border-green-400 my-1 cursor-pointer`}
                onClick={() => {
                  setImageSelected(image);
                  setImageKey(generateKey(image, index));
                }}
              >
                <img className="w-full  h-20 p-1" src={image} />
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
        <img className="w-[100%] h-[500px] object-cover" src={imageSelected} />
      </div>
    </div>
  );
};
