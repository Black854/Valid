import React, { useState } from 'react'
import { Layout, ConfigProvider, FloatButton } from 'antd'
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import { Header1 } from './components/Header/Header'
import { EquipCard } from './components/Equipment/EquipCard/EquipCard'
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
import { Monplans } from './components/Monplans/Monplans'
import { Reports } from './components/Monplans/Reports'
import { VmpPlans } from './components/VmpPlans/VmpPlans'
import { Result404 } from './components/common/Results/404'
import ruRU from 'antd/es/locale/ru_RU'

export const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [typeTheme, setTheme] = useState('dark') // Изначально устанавливаем темную тему
  const { theme } = require('antd/lib')
  const handleThemeChange = (checked: boolean) => {
    checked ? setTheme('light') : setTheme('dark')
  }
  
  location.pathname === '/' && navigate('/work')

  return (

    <ConfigProvider theme={{ algorithm: typeTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }} locale={ruRU} >
      <Layout style={{ minHeight: '100vh' }}>
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
            <Route path="/monplans" element={<Monplans />} />
            <Route path="/monplans/:year/:month" element={<Monplans />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/:year/:month" element={<Reports />} />
            <Route path="/vmp" element={<VmpPlans />} />
            <Route path="/vmp/:number/:year" element={<VmpPlans />} />
            <Route path="*" element={<Result404 />} />
          </Routes>
          <FloatButton.BackTop />
        </Layout>
        <CustomFooter />
      </Layout>
    </ConfigProvider>
  )
}