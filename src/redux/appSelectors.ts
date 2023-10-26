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

export const getIntervals = (state: AppStateType) => {
    return (state.app.intervals)
}

export const getIntervalsByAr = (state: AppStateType, ar: string | undefined = '0') => {
    const allIntervalsData = getIntervals(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const intervalWithAr = allIntervalsData.find(e => e.value === ar);
  
    return intervalWithAr?.interval; // Возвращаем объект или null, если не найден
}