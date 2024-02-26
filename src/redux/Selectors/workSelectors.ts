import { AppStateType } from "../store"

export const getWorkError = (state: AppStateType) => {
    return (state.work.errorMessage)
}

export const getWorkChangesSelector = (state: AppStateType) => {
    return (state.work.workChanges)
}