import React, { useState } from 'react'
import Equipment from './components/Equipment/Equipment'
import { Layout, ConfigProvider, theme } from 'antd'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import CustomFooter from './components/Footer/Footer'
import EquipCard from './components/Equipment/EquipCard/EquipCard'
import './App.css'; // Создайте файл App.css

function App() {
  
  const { Footer, Sider, Content } = Layout;
  return (
    <Router>
      <Provider store={store}>
        <ConfigProvider theme={{ algorithm: theme.defaultAlgorithm}} >
          <Layout className="layout">
            <Header />
            <Layout className="layout">
              <Routes>
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/:id" element={<EquipCard />} />
              </Routes>
            </Layout>
            <CustomFooter />
          </Layout>
        </ConfigProvider>
      </Provider>
    </Router>
  );
}

export default React.memo(App);
