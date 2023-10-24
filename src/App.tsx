import React, { useState } from 'react'
import Equipment from './components/Equipment/Equipment'
import { Layout, ConfigProvider} from 'antd'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import CustomFooter from './components/Footer/Footer'
import EquipCard from './components/Equipment/EquipCard/EquipCard'
import './App.css'
const { theme } = require('antd/lib');

function App() {
  const [typeTheme, setTheme] = useState('light'); // Изначально устанавливаем светлую тему

  // Обработчик события для переключения темы
  const handleThemeChange = (checked: boolean) => {
    // В зависимости от значения Switch (true или false), меняем тему
    if (checked) {
      setTheme('light'); // Если true, устанавливаем светлую тему
    } else {
      setTheme('dark'); // Если false, устанавливаем темную тему
    }
  };
  return (
    <Router>
      <Provider store={store}>
        <ConfigProvider theme={{algorithm: typeTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }} >
          <Layout>
            <Header swithTheme={handleThemeChange} typeTheme={typeTheme} />
            <Layout>
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
