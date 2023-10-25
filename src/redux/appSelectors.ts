import { AppStateType } from "./store"

export const getEquipGroupsSelector = (state: AppStateType) => {
    return (state.app.equipGroups)
}

export const getDepartmentsSelector = (state: AppStateType) => {
    return (state.app.departments)
}

export const getVMPDepartmentsSelector = (state: AppStateType) => {
    return (state.app.vmpDepartments)
}
