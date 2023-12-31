import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { authAPI } from "../../api/authAPI"
import { deleteCookie, getCookie, setCookie } from "../../components/common/cookie"

type AuthResponseDataType = {
    login: string
    fio: string
    position: string
    sp: string
    access: string
}

const initialState = {
    isAuth: false,
    login: '',
    userName: '',
    access: '',
    position: '',
    sp: '',
    apiKey: '',
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
                responseMessage: null
            }
        case 'auth/SET_RESPONSE_MESSAGE':
            return {...state, responseMessage: action.text}
        default:
            return state
    }
}

export const login = (userName: string, password: string, remember: boolean | undefined): ThunkType => async (dispatch) => {
    const rememberMe = (remember === undefined ? false : remember)

    const data = await authAPI.login(userName, password, rememberMe)
    if (data.resultCode === 0) {
        dispatch(authActions.setUserData(data.userData))
        setCookie('login', data.userData.login, 7)
        setCookie('userName', data.userData.fio, 7)
        setCookie('access', data.userData.access, 7)
        setCookie('position', data.userData.position, 7)
        setCookie('sp', data.userData.sp, 7)
    } else {
        dispatch(authActions.setResponseMessage(data.messages['0']))
    }
}

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(authActions.deleteUserData())
    deleteCookie('login')
    deleteCookie('userName')
    deleteCookie('access')
    deleteCookie('position')
    deleteCookie('sp')
}

export const loginOfCookieData = (): ThunkType => async (dispatch) => {

    const login = getCookie('login')
    const fio = getCookie('userName')
    const access = getCookie('access')
    const position = getCookie('position')
    const sp = getCookie('sp')

    if (login && fio && access && position && sp) {
        const data = {
            login,
            fio,
            position,
            sp,
            access,
        }
        dispatch(authActions.setUserData(data))
    }
}

type ActionTypes = InferActionsTypes<typeof authActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const authActions = {
    setUserData: (data: AuthResponseDataType) => ({ type: 'auth/SET_AUTH_USER', data } as const),
    deleteUserData: () => ({ type: 'auth/DELETE_AUTH_USER' } as const),
    setResponseMessage: (text: string) => ({ type: 'auth/SET_RESPONSE_MESSAGE', text } as const),
}