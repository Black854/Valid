import { AppStateType } from "../store"

export const getInstData = (state: AppStateType) => {
    return state.instruments.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.instruments.isLoading)
}

export const getTechInfo = (state: AppStateType) => {
    return (state.instruments.technicalInfo)
}

export const getPhotosSelector = (state: AppStateType) => {
    return (state.instruments.photos)
}

export const getInstById = (state: AppStateType, id: string | undefined ='0') => {
    const allSInstrumentsData = getInstData(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const instWithId = allSInstrumentsData.find(e => e.id === id);
  
    return instWithId // Возвращаем объект или null, если не найден
}

export const getInstErrorMessage = (state: AppStateType) => {
    return (state.instruments.errorMessage)
}

export const getInstCreateNewObjectErrorMessage = (state: AppStateType) => {
    return (state.instruments.createNewObjectErrorMessage)
}

export const getInstCardError = (state: AppStateType) => {
    return (state.instruments.instCardError)
}