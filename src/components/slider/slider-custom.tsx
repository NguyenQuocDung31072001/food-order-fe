import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

const ITEM_WIDTH = 272;
const ITEM_SCROLL = 2;

type SliderCustomProps = {
  children: React.ReactNode;
};

const ContainerActionButton: React.FC<{
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
}> = ({ children, onClick }) => {
  return (
    <div className="bg-white py-2 px-4 rounded-[10px] cursor-pointer hover:bg-gray-100" onClick={onClick}>
      {children}
    </div>
  );
};

export const SliderCustom: React.FC<SliderCustomProps> = ({ children }) => {
  const containerScrollRef = React.useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const cursor = Math.round(scrollLeft / ITEM_WIDTH);

  const handleScroll = () => {
    const { scrollLeft } = containerScrollRef.current || {};
    setScrollLeft(scrollLeft ?? 0);
  };

  const handleScrollTo = (cursor: number) => {
    containerScrollRef.current?.scrollTo({ left: cursor * ITEM_WIDTH, behavior: 'smooth' });
  };

  return (
    <div className={`pb-10 relative `}>
      <div className="absolute top-[40%] left-0 z-40">
        <ContainerActionButton
          onClick={() => {
            handleScrollTo(Math.max(cursor - ITEM_SCROLL, 0));
          }}
        >
          <LeftOutlined />
        </ContainerActionButton>
      </div>

      <div ref={containerScrollRef} className={`flex duration-300 overflow-x-scroll`} onScroll={handleScroll}>
        {children}
      </div>
      <div className="absolute top-[40%] right-0 z-40">
        <ContainerActionButton
          onClick={() => {
            handleScrollTo(Math.min(cursor + ITEM_SCROLL, containerScrollRef.current?.offsetWidth ?? 0));
          }}
        >
          <RightOutlined />
        </ContainerActionButton>
      </div>
    </div>
  );
};
