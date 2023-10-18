import React from 'react';
import { Menu, theme, Layout } from 'antd';
const { Header, Content, Footer } = Layout;

const Header1: React.FC = () => {
    const {
        token: { colorBgContainer },
      } = theme.useToken();
    return <Layout className="layout">
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={new Array(15).fill(null).map((_, index) => {
                    const key = index + 1;
                    return {
                        key,
                        label: `nav ${key}`,
                    };
                    })}
                />
                </Header>
            </Layout>
}

export default Header1