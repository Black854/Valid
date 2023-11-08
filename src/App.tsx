import React, { useState } from 'react'
import { Layout, ConfigProvider} from 'antd'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import { Header1 } from './components/Header/Header'
import { EquipCard } from './components/Equipment/EquipCard/EquipCard'
import { store } from './redux/store'
import { Equipment } from './components/Equipment/Equipment'
import { CustomFooter } from './components/Footer/Footer'
import { Premises } from './components/Premises/Premises'
import { PremCard } from './components/Premises/PremCard/PremCard'
import { WorkList } from './components/WorkList/WorkList'
const { theme } = require('antd/lib')

export const App: React.FC = () => {
  const [typeTheme, setTheme] = useState('dark') // Изначально устанавливаем светлую тему

  // Обработчик события для переключения темы
  const handleThemeChange = (checked: boolean) => {
    // В зависимости от значения Switch (true или false), меняем тему
    if (checked) {
      setTheme('dark') // Если true, устанавливаем светлую тему
    } else {
      setTheme('light') // Если false, устанавливаем темную тему
    }
  }

  return (
    <Router>
      <Provider store={store}>
        <ConfigProvider theme={{algorithm: typeTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }} >
          <Layout style={{height: '100vh'}}>
            <Header1 swithTheme={handleThemeChange} typeTheme={typeTheme} />
            <Layout>
              <Routes>
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/:id" element={<EquipCard />} />
                <Route path="/premises" element={<Premises />} />
                <Route path="/premises/:id" element={<PremCard />} />
                <Route path="/work" element={<WorkList />} />
              </Routes>
            </Layout>
            <CustomFooter />
          </Layout>
        </ConfigProvider>
      </Provider>
    </Router>
  )
}