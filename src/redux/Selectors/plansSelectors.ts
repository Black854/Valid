import { AppStateType } from "../store"

export const getMonthListSelector = (state: AppStateType) => {
    return (state.plans.monthList)
}

export const getPlansSelector = (state: AppStateType) => {
    return (state.plans.plans)
}