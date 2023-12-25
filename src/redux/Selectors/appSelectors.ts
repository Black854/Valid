import { AppStateType } from "../store"

export const getEquipGroupsSelector = (state: AppStateType) => {
    return (state.app.equipGroups)
}

export const getPremModesSelector = (state: AppStateType) => {
    return (state.app.premModes)
}

export const getDepartmentsSelector = (state: AppStateType) => {
    return (state.app.departments)
}

export const getVMPDepartmentsSelector = (state: AppStateType) => {
    return (state.app.vmpDepartments)
}

export const getIntervals = (state: AppStateType) => {
    return (state.app.intervals)
}

export const getSopCodeFormSelector = (state: AppStateType) => {
    return (state.app.sopCodeForm)
}

export const getAllValidatorsSelector = (state: AppStateType) => {
    return (state.app.allValidators)
}

export const getVacationsDataSelector = (state: AppStateType) => {
    return (state.app.vacationsData)
}

export const vacationsIsLoadingSelector = (state: AppStateType) => {
    return (state.app.vacationsIsLoading)
}

export const getThemeType = (state: AppStateType) => {
    return (state.app.themeType)
}

export const getPainterDataSelector = (state: AppStateType) => {
    return (state.app.painterData)
}

export const getCodeSettingsSelector = (state: AppStateType) => {
    return (state.app.codeSettingsData)
}

export const getIntervalsByAr = (state: AppStateType, ar: string | undefined = '0') => {
    const allIntervalsData = getIntervals(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const intervalWithAr = allIntervalsData.find(e => e.value === ar);
  
    return intervalWithAr?.interval; // Возвращаем объект или null, если не найден
}