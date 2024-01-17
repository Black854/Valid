import { AppStateType } from "../store"

export const getSysData = (state: AppStateType) => {
    return state.systems.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.systems.isLoading)
}

export const getSysReestrDataSelector = (state: AppStateType) => {
    return (state.systems.reestrData)
}

export const getTechInfo = (state: AppStateType) => {
    return (state.systems.technicalInfo)
}

export const getPhotosSelector = (state: AppStateType) => {
    return (state.systems.photos)
}

export const getSysById = (state: AppStateType, id: string | undefined ='0') => {
    const allSystemsData = getSysData(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const sysWithId = allSystemsData.find(e => e.id === id);
  
    return sysWithId // Возвращаем объект или null, если не найден
}

export const getIsReestrDataLoading = (state: AppStateType) => {
    return (state.systems.isReestrDataLoading)
}

export const getIsDescriptionLoading = (state: AppStateType) => {
    return (state.systems.isDescriptionLoading)
}

export const getCurrentSysDataSelector = (state: AppStateType) => {
    return (state.systems.sysIdArrayAtWorkAtCurrentUser)
}

export const getSysErrorMessage = (state: AppStateType) => {
    return (state.systems.errorMessage)
}

export const getSysCreateNewObjectErrorMessage = (state: AppStateType) => {
    return (state.systems.createNewObjectErrorMessage)
}

export const getSysCardError = (state: AppStateType) => {
    return (state.systems.sysCardError)
}