import { AppStateType } from "./store"

export const getEquipData = (state: AppStateType) => {
    return state.equipment.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.equipment.isLoading)
}