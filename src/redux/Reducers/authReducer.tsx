import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { authAPI } from "../../api/authAPI"
import { deleteCookie, getCookie, setCookie } from "../../components/common/cookie"
import { setIsInitializedAppStatus, setTheme } from "./appReducer"

type AuthResponseDataType = {
    login: string
    fio: string
    position: string
    sp: string
    access: string
    token: string
}

const initialState = {
    isAuth: false,
    login: '',
    userName: '',
    access: '',
    position: '',
    sp: '',
    token: '',
    responseMessage: null as string | null
}

type InitialStateType = typeof initialState
export const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_AUTH_USER':
            return {
                ...state,
                isAuth: true,
                login: action.data.login,
                userName: action.data.fio,
                access: action.data.access,
                position: action.data.position,
                sp: action.data.sp,
                token: action.data.token,
                responseMessage: null
            }
        case 'auth/DELETE_AUTH_USER':
            return {
                ...state,
                isAuth: false,
                login: '',
                userName: '',
                access: '',
                position: '',
                sp: '',
                token: '',
                responseMessage: null
            }
        case 'auth/SET_RESPONSE_MESSAGE':
            return { ...state, responseMessage: action.text }
        default:
            return state
    }
}

export const login = (userName: string, password: string, remember: boolean | undefined): ThunkType => async (dispatch) => {
    const rememberMe = (remember === undefined ? false : remember)

    const data = await authAPI.login(userName, password, rememberMe)
    if (data.resultCode === 0) {
        Promise.all([
            setCookie('login', data.userData.login, 30),
            setCookie('userName', data.userData.fio, 30),
            setCookie('access', data.userData.access, 30),
            setCookie('position', data.userData.position, 30),
            setCookie('sp', data.userData.sp, 30),
            setCookie('token', data.userData.token, 30),
        ]).then(() => {
            dispatch(authActions.setUserData(data.userData))
            dispatch(setIsInitializedAppStatus(true))
        })
    } else {
        dispatch(authActions.setResponseMessage(data.messages['0']))
        dispatch(setIsInitializedAppStatus(true))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    Promise.all([
        deleteCookie('login'),
        deleteCookie('userName'),
        deleteCookie('access'),
        deleteCookie('position'),
        deleteCookie('sp'),
        deleteCookie('token'),
        deleteCookie('theme')
    ]).then(() => {
        dispatch(authActions.deleteUserData())
        dispatch(setIsInitializedAppStatus(true))
    })
}

export const loginOfCookieData = (): ThunkType => async (dispatch) => {

    const login = getCookie('login')
    const fio = getCookie('userName')
    const access = getCookie('access')
    const position = getCookie('position')
    const sp = getCookie('sp')
    const token = getCookie('token')
    const theme = getCookie('theme') as 'dark' | 'light'

    if (login && fio && access && position && sp && token) {
        const data = {
            login,
            fio,
            position,
            sp,
            access,
            token
        }
        dispatch(authActions.setUserData(data))
        dispatch(setTheme(theme))
    }
    dispatch(setIsInitializedAppStatus(true))
}

type ActionTypes = InferActionsTypes<typeof authActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const authActions = {
    setUserData: (data: AuthResponseDataType) => ({ type: 'auth/SET_AUTH_USER', data } as const),
    deleteUserData: () => ({ type: 'auth/DELETE_AUTH_USER' } as const),
    setResponseMessage: (text: string) => ({ type: 'auth/SET_RESPONSE_MESSAGE', text } as const),
}