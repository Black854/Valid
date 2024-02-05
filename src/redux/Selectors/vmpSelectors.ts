import { AppStateType } from "../store"

export const getVMPDataSelector = (state: AppStateType) => {
    return (state.vmp.VMPData)
}

export const getObjectVMPPlansDataSelector = (state: AppStateType) => {
    return (state.vmp.objectVMPPlansData)
}

export const getObjectNextYEarVMPPlansDataSelector = (state: AppStateType) => {
    return (state.vmp.objectNextYearVMPPlansData)
}

export const getVMPErrorMessage = (state: AppStateType) => {
    return (state.vmp.errorMessage)
}

export const getVMPChangeListSelector = (state: AppStateType) => {
    return (state.vmp.vmpChangeList)
}