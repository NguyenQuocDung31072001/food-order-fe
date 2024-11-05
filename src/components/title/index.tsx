import { useLink } from '@refinedev/core';
import { theme } from 'antd';

import { Logo } from './styled';
import { BikeWhiteIcon } from 'components/icons';

const { useToken } = theme;

type TitleProps = {
  collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Logo>
      <Link to="/">
        <BikeWhiteIcon
          style={{
            fontSize: '32px',
            color: token.colorTextHeading,
          }}
        />
        <span className="text-black">Food order</span>
      </Link>
    </Logo>
  );
};
