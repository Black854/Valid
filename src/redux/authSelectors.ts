import { AppStateType } from "./store"

export const getUserIdSelector = (state: AppStateType) => {
    return (state.auth.userId)
}

export const getAuthUserNameSelector = (state: AppStateType) => {
    return (state.auth.userName)
}

export const getApiKeySelector = (state: AppStateType) => {
    return (state.auth.apiKey)
}

export const getLoginSelector = (state: AppStateType) => {
    return (state.auth.login)
}

export const getIsAuthSelector = (state: AppStateType) => {
    return (state.auth.isAuth)
}