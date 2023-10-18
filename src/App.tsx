import React from 'react';
import Equipment from './components/Equipment';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';



function App() {
  const { Footer, Sider, Content } = Layout;
  return (
    <Layout>
      <Header />
      <Layout hasSider>
        <Sidebar />
        <Content>Content</Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default App;
