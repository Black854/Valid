import React from 'react';
import Equipment from './components/Equipment/Equipment';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import CustomFooter from './components/Footer/Footer';
import EquipCard from './components/Equipment/EquipCard/EquipCard';
import './App.css';



function App() {
  const { Footer, Sider, Content } = Layout;
  return (
    <Router >
      <Provider store={store}>
        <Layout>
          <Header />
          <Layout>
            {/* <Sidebar /> */}
            <Routes>
              <Route path='/equipment' element={<Equipment />}/>
              <Route path='/equipment/:id' element={<EquipCard />}/>
            </Routes>
          </Layout>
          <CustomFooter />
        </Layout>
      </Provider>
    </Router>
  );
}

export default React.memo(App);
