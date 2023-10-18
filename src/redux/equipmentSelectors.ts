import { AppStateType } from "./store"

export const getEquipData = (state: AppStateType) => {
    return state.equipment.data
}