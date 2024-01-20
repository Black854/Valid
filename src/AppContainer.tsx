import { useLocation, useNavigate } from "react-router-dom"
import { AppDispatch } from "./redux/store"
import { useDispatch, useSelector } from "react-redux"
import { getIsAuthSelector } from "./redux/Selectors/authSelectors"
import { loginOfCookieData } from "./redux/Reducers/authReducer"
import { getAppErrorMessage, getInitializeAppStatus, getThemeType } from "./redux/Selectors/appSelectors"
import { appActions, setTheme } from "./redux/Reducers/appReducer"
import { useEffect } from "react"
import { App } from "./App"
import { Login } from "./components/Login/Login"
import { message } from "antd"

export const AppContainer: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch: AppDispatch = useDispatch()
    const isAuth = useSelector(getIsAuthSelector)
    const initializeAppStatus = useSelector(getInitializeAppStatus)
    !isAuth && dispatch(loginOfCookieData())
    const themeType = useSelector(getThemeType)

    const { theme } = require('antd/lib')

    const handleThemeChange = (checked: boolean) => {
        checked ? dispatch(setTheme('light')) : dispatch(setTheme('dark'))
    }

    const errorMessage = useSelector(getAppErrorMessage)

    const [messageApi, contextHolder] = message.useMessage()

    useEffect(() => {
        if (errorMessage) {
            messageApi.open({
                type: 'error',
                content: errorMessage,
                duration: 7
            })
            dispatch(appActions.setErrorMessage(null))
        }
    }, [errorMessage])

    useEffect(() => {
        (isAuth && initializeAppStatus) ? (location.pathname === '/' || location.pathname === '/login') && navigate('/work') : navigate('/login')
    }, [isAuth, location.pathname])

    return (isAuth && initializeAppStatus) ? <App contextHolder={contextHolder} theme={theme} themeType={themeType} handleThemeChange={handleThemeChange} /> : <Login />
}