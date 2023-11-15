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
import { Monitoring } from './components/WorkList/Monitoring'
import { Systems } from './components/Systems/Systems'
import { SysCard } from './components/Systems/SysCard/SysCard'
import { Processes } from './components/Processes/Processes'
import { ProcCard } from './components/Processes/ProcCard/ProcCard'
import { Instruments } from './components/Instruments/Instruments'
import { InstCard } from './components/Instruments/InstCard/InstCard'
import { Signal } from './components/Signal/Signal'
const { theme } = require('antd/lib')

export const App: React.FC = () => {
  const [typeTheme, setTheme] = useState('dark') // Изначально устанавливаем темную тему

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
          <Layout style={{minHeight: '100vh'}}>
            <Header1 swithTheme={handleThemeChange} typeTheme={typeTheme} />
            <Layout>
              <Routes>
                <Route path="/equipment" element={<Equipment />} />
                <Route path="/equipment/:id" element={<EquipCard />} />
                <Route path="/premises" element={<Premises />} />
                <Route path="/premises/:id" element={<PremCard />} />
                <Route path="/systems" element={<Systems />} />
                <Route path="/systems/:id" element={<SysCard />} />
                <Route path="/processes" element={<Processes />} />
                <Route path="/processes/:id" element={<ProcCard />} />
                <Route path="/work" element={<WorkList />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/instruments" element={<Instruments />} />
                <Route path="/instruments/:id" element={<InstCard />} />
                <Route path="/signal" element={<Signal />} />
              </Routes>
            </Layout>
            <CustomFooter />
          </Layout>
        </ConfigProvider>
      </Provider>
    </Router>
  )
}