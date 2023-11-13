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

export const getIsDepartmentLoading = (state: AppStateType) => {
    return (state.processes.isDepartmentLoading)
}

export const getIsVMPDepartmentLoading = (state: AppStateType) => {
    return (state.processes.isVMPDepartmentLoading)
}

export const getIsGroupLoading = (state: AppStateType) => {
    return (state.processes.isGroupLoading)
}

export const getIsReestrDataLoading = (state: AppStateType) => {
    return (state.processes.isReestrDataLoading)
}

export const getIsIntervalLoading = (state: AppStateType) => {
    return (state.processes.isIntervalLoading)
}

export const getCurrentProcDataSelector = (state: AppStateType) => {
    return (state.processes.procIdArrayAtWorkAtCurrentUser)
}