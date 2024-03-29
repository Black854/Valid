import { AppStateType } from "../store"

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

export const getIsReestrDataLoading = (state: AppStateType) => {
    return (state.premises.isReestrDataLoading)
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

export const getCleanTabSelector = (state: AppStateType) => {
    return (state.premises.cleanTab)
}

export const getIsCleanPremGroupsLoading = (state: AppStateType) => {
    return (state.premises.isCleanPremGroupsLoading)
}

export const getIsDescriptionLoading = (state: AppStateType) => {
    return (state.premises.isDescriptionLoading)
}

export const getCurrentPremDataSelector = (state: AppStateType) => {
    return (state.premises.premIdArrayAtWorkAtCurrentUser)
}

export const getPremErrorMessage = (state: AppStateType) => {
    return (state.premises.errorMessage)
}

export const getPremCreateNewObjectErrorMessage = (state: AppStateType) => {
    return (state.premises.createNewObjectErrorMessage)
}

export const getPremCardError = (state: AppStateType) => {
    return (state.premises.premCardError)
}