import { useState, useEffect } from 'react';
import { useGetLocale, useSetLocale, useGetIdentity, useTranslate, useList } from '@refinedev/core';
import { Link } from 'react-router-dom';
import { SearchOutlined, DownOutlined } from '@ant-design/icons';

import {
  Dropdown,
  Input,
  Avatar,
  Typography,
  Space,
  Grid,
  Row,
  Col,
  AutoComplete,
  Layout as AntdLayout,
  Button,
  theme,
  MenuProps,
} from 'antd';

import { useTranslation } from 'react-i18next';

import { useConfigProvider } from '../../context';
import { IconMoon, IconSun } from '../../components/icons';

const { Header: AntdHeader } = AntdLayout;
const { useToken } = theme;
const { Text } = Typography;
const { useBreakpoint } = Grid;

interface IOptionGroup {
  value: string;
  label: string | React.ReactNode;
}

interface IOptions {
  label: string | React.ReactNode;
  options: IOptionGroup[];
}

export const Header: React.FC = () => {
  const { token } = useToken();
  const { mode, setMode } = useConfigProvider();
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const { data: user } = useGetIdentity<any>();
  const screens = useBreakpoint();
  const t = useTranslate();

  const currentLocale = locale();

  const menuItems: MenuProps['items'] = [...(i18n.languages || [])].sort().map((lang: string) => ({
    key: lang,
    onClick: () => changeLanguage(lang),
    icon: (
      <span style={{ marginRight: 8 }}>
        {/* <Avatar size={16} src={`/images/flags/${lang}.svg`} /> */}
        ok
      </span>
    ),
    label: lang === 'en' ? 'English' : 'German',
  }));

  return (
    <AntdHeader
      style={{
        backgroundColor: token.colorBgElevated,
        padding: '0 24px',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <Row
        align="middle"
        style={{
          justifyContent: screens.sm ? 'space-between' : 'end',
        }}
      >
        <Col xs={0} sm={12}>
          <AutoComplete
            style={{
              width: '100%',
              maxWidth: '550px',
            }}
            options={[]}
            filterOption={false}
          >
            <Input size="large" placeholder={t('search.placeholder')} suffix={<SearchOutlined />} />
          </AutoComplete>
        </Col>
        <Col>
          <Space size="middle" align="center">
            <Button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              type="default"
              icon={mode === 'light' ? <IconMoon /> : <IconSun />}
              onClick={() => {
                setMode(mode === 'light' ? 'dark' : 'light');
              }}
            />
            <Dropdown
              menu={{
                items: menuItems,
                selectedKeys: currentLocale ? [currentLocale] : [],
              }}
            >
              <a style={{ color: 'inherit' }} onClick={(e) => e.preventDefault()}>
                <Space>
                  <div
                    style={{
                      display: screens.lg ? 'block' : 'none',
                    }}
                  >
                    {currentLocale === 'en' ? 'English' : 'German'}
                    <DownOutlined
                      style={{
                        fontSize: '12px',
                        marginLeft: '6px',
                      }}
                    />
                  </div>
                </Space>
              </a>
            </Dropdown>

            <Text
              ellipsis
              strong
              style={{
                display: 'flex',
              }}
            >
              {user?.name}
            </Text>
            <Avatar size="large" src={user?.avatar} alt={user?.name} />
          </Space>
        </Col>
      </Row>
    </AntdHeader>
  );
};
