import { AppStateType } from "../store"

export const getProcData = (state: AppStateType) => {
    return state.processes.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.processes.isLoading)
}

export const getProcReestrDataSelector = (state: AppStateType) => {
    return (state.processes.reestrData)
}

export const getTechInfo = (state: AppStateType) => {
    return (state.processes.technicalInfo)
}

export const getPhotosSelector = (state: AppStateType) => {
    return (state.processes.photos)
}

export const getProcById = (state: AppStateType, id: string | undefined ='0') => {
    const allProcessesData = getProcData(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const procWithId = allProcessesData.find(e => e.id === id);
  
    return procWithId // Возвращаем объект или null, если не найден
}

export const getIsReestrDataLoading = (state: AppStateType) => {
    return (state.processes.isReestrDataLoading)
}

export const getIsDescriptionLoading = (state: AppStateType) => {
    return (state.processes.isDescriptionLoading)
}

export const getCurrentProcDataSelector = (state: AppStateType) => {
    return (state.processes.procIdArrayAtWorkAtCurrentUser)
}