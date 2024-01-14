import { AppStateType } from "../store"

export const getAuthUserNameSelector = (state: AppStateType) => {
    return (state.auth.userName)
}

export const getLoginSelector = (state: AppStateType) => {
    return (state.auth.login)
}

export const getUserDataAccessSelector = (state: AppStateType) => {
    return (state.auth.access)
}

export const getUserDataPositionSelector = (state: AppStateType) => {
    return (state.auth.position)
}

export const getUserDataSpSelector = (state: AppStateType) => {
    return (state.auth.sp)
}

export const getAuthResponseMessage = (state: AppStateType) => {
    return (state.auth.responseMessage)
}

export const getIsAuthSelector = (state: AppStateType) => {
    return (state.auth.isAuth)
}

export const getTokenSelector = (state: AppStateType) => {
    return (state.auth.token)
}