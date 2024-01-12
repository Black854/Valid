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
import { Login } from './components/Login/Login'
import { getIsAuthSelector } from './redux/Selectors/authSelectors'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from './redux/store'
import { loginOfCookieData } from './redux/Reducers/authReducer'
import { Vacations } from './components/Vacations/Vacations'
import { PaperPlanes } from './components/Paperplanes/PaperPlanes'
import { Painter } from './components/Painter/Painter'
import { setTheme } from './redux/Reducers/appReducer'
import { getThemeType } from './redux/Selectors/appSelectors'
import { Settings } from './components/Settings/Settings'
import { Prints } from './components/Prints/Prints'

export const App: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const isAuth = useSelector(getIsAuthSelector)
  !isAuth && dispatch(loginOfCookieData())
  const themeType = useSelector(getThemeType)
  const { theme } = require('antd/lib')
  const handleThemeChange = (checked: boolean) => {
    checked ? dispatch(setTheme('light')) : dispatch(setTheme('dark'))
  }

  location.pathname === '/' && navigate('/work')

  return (

    <ConfigProvider theme={{ algorithm: themeType === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }} locale={ruRU} >
      <Layout style={{ minHeight: '100vh' }}>
        <Header1 swithTheme={handleThemeChange} typeTheme={themeType} />
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
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
            <Route path="/vacations" element={<Vacations />} />
            <Route path="/paperplanes" element={<PaperPlanes />} />
            <Route path="/painter" element={<Painter />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/prints" element={<Prints />} />
            <Route path="/prints/:report/:page?" element={<Prints />} />
            <Route path="*" element={<Result404 />} />
          </Routes>
          <FloatButton.BackTop />
        </Layout>
        <CustomFooter />
      </Layout>
    </ConfigProvider>
  )
}