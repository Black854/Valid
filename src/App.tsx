import React, { JSXElementConstructor, ReactElement, Suspense, lazy } from 'react'
import { Layout, ConfigProvider, FloatButton } from 'antd'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header1 } from './components/Header/Header'
import { CustomFooter } from './components/Footer/Footer'
import { WorkList } from './components/WorkList/WorkList'
import { Result404 } from './components/common/Results/404'
import ruRU from 'antd/es/locale/ru_RU'
import { Login } from './components/Login/Login'
import { Loading } from './components/common/Loading'

const Prints = lazy(() => import('./components/Prints/Prints').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Equipment = lazy(() => import('./components/Equipment/Equipment').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const EquipCard = lazy(() => import('./components/Equipment/EquipCard/EquipCard').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Premises = lazy(() => import('./components/Premises/Premises').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const PremCard = lazy(() => import('./components/Premises/PremCard/PremCard').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Monitoring = lazy(() => import('./components/WorkList/Monitoring').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Systems = lazy(() => import('./components/Systems/Systems').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const SysCard = lazy(() => import('./components/Systems/SysCard/SysCard').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Processes = lazy(() => import('./components/Processes/Processes').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const ProcCard = lazy(() => import('./components/Processes/ProcCard/ProcCard').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const PaperPlanes = lazy(() => import('./components/Paperplanes/PaperPlanes').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Vacations = lazy(() => import('./components/Vacations/Vacations').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Settings = lazy(() => import('./components/Settings/Settings').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Painter = lazy(() => import('./components/Painter/Painter').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Monplans = lazy(() => import('./components/Monplans/Monplans').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Reports = lazy(() => import('./components/Monplans/Reports').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const VmpPlans = lazy(() => import('./components/VmpPlans/VmpPlans').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Instruments = lazy(() => import('./components/Instruments/Instruments').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const InstCard = lazy(() => import('./components/Instruments/InstCard/InstCard').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))
const Signal = lazy(() => import('./components/Signal/Signal').then(module => ({ default: module.default } as { default: React.ComponentType<any> })))

type AppPropsType = {
  handleThemeChange: (checked: boolean) => void
  themeType: string
  theme: any
  contextHolder: ReactElement<any, string | JSXElementConstructor<any>>
}

export const App: React.FC<AppPropsType> = ({handleThemeChange, themeType, theme, contextHolder}) => {

  return <>
    {contextHolder}
    <ConfigProvider theme={{ algorithm: themeType === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm }} locale={ruRU} >
      <Layout style={{ minHeight: '100vh' }}>
        <Header1 swithTheme={handleThemeChange} typeTheme={themeType} />
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/equipment" element={<Suspense fallback={<Loading />}><Equipment /></Suspense>} />
            <Route path="/equipment/:id" element={<Suspense fallback={<Loading />}><EquipCard /></Suspense>} />
            <Route path="/premises" element={<Suspense fallback={<Loading />}><Premises /></Suspense>} />
            <Route path="/premises/:id" element={<Suspense fallback={<Loading />}><PremCard /></Suspense>} />
            <Route path="/systems" element={<Suspense fallback={<Loading />}><Systems /></Suspense>} />
            <Route path="/systems/:id" element={<Suspense fallback={<Loading />}><SysCard /></Suspense>} />
            <Route path="/processes" element={<Suspense fallback={<Loading />}><Processes /></Suspense>} />
            <Route path="/processes/:id" element={<Suspense fallback={<Loading />}><ProcCard /></Suspense>} />
            <Route path="/work" element={<WorkList />} />
            <Route path="/monitoring" element={<Suspense fallback={<Loading />}><Monitoring /></Suspense>} />
            <Route path="/instruments" element={<Suspense fallback={<Loading />}><Instruments /></Suspense>} />
            <Route path="/instruments/:id" element={<Suspense fallback={<Loading />}><InstCard /></Suspense>} />
            <Route path="/signal" element={<Suspense fallback={<Loading />}><Signal /></Suspense>} />
            <Route path="/monplans" element={<Suspense fallback={<Loading />}><Monplans /></Suspense>} />
            <Route path="/monplans/:year/:month" element={<Suspense fallback={<Loading />}><Monplans /></Suspense>} />
            <Route path="/reports" element={<Suspense fallback={<Loading />}><Reports /></Suspense>} />
            <Route path="/reports/:year/:month" element={<Suspense fallback={<Loading />}><Reports /></Suspense>} />
            <Route path="/vmp" element={<Suspense fallback={<Loading />}><VmpPlans /></Suspense>} />
            <Route path="/vmp/:number/:year" element={<Suspense fallback={<Loading />}><VmpPlans /></Suspense>} />
            <Route path="/vacations" element={<Suspense fallback={<Loading />}><Vacations /></Suspense>} />
            <Route path="/paperplanes" element={<Suspense fallback={<Loading />}><PaperPlanes /></Suspense>} />
            <Route path="/painter" element={<Suspense fallback={<Loading />}><Painter /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<Loading />}><Settings /></Suspense>} />
            <Route path="/prints" element={<Suspense fallback={<Loading />}><Prints /></Suspense>} />
            <Route path="/prints/:report/:page?" element={<Suspense fallback={<Loading />}><Prints /></Suspense>} />
            <Route path="*" element={<Result404 />} />
          </Routes>
          <FloatButton.BackTop />
        </Layout>
        <CustomFooter />
      </Layout>
    </ConfigProvider>
  </>
}