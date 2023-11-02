import { AppStateType } from "./store"

export const getPremData = (state: AppStateType) => {
    return state.premises.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.premises.isLoading)
}

export const getPremReestrDataSelector = (state: AppStateType) => {
    return (state.premises.reestrData)
}

export const getTechInfo = (state: AppStateType) => {
    return (state.premises.technicalInfo)
}

export const getPhotosSelector = (state: AppStateType) => {
    return (state.premises.photos)
}

export const getPremById = (state: AppStateType, id: string | undefined ='0') => {
    const allPremisesData = getPremData(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const premWithId = allPremisesData.find(e => e.id === id);
  
    return premWithId; // Возвращаем объект или null, если не найден
}

export const getIsDepartmentLoading = (state: AppStateType) => {
    return (state.premises.isDepartmentLoading)
}

export const getIsVMPDepartmentLoading = (state: AppStateType) => {
    return (state.premises.isVMPDepartmentLoading)
}

export const getIsClassLoading = (state: AppStateType) => {
    return (state.premises.isClassLoading)
}

export const getIsReestrDataLoading = (state: AppStateType) => {
    return (state.premises.isReestrDataLoading)
}

export const getIsIntervalLoading = (state: AppStateType) => {
    return (state.premises.isIntervalLoading)
}

export const getCleanPremListSelector = (state: AppStateType) => {
    return (state.premises.cleanPremList)
}

export const getIsCleanPremDataLoading = (state: AppStateType) => {
    return (state.premises.isCleanPremDataLoading)
}

export const getCleanGroupLabelsSelector = (state: AppStateType) => {
    return (state.premises.cleanGroupLabels)
}