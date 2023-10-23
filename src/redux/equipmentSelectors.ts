import { AppStateType } from "./store"

export const getEquipData = (state: AppStateType) => {
    return state.equipment.data
}

export const getIsLoading = (state: AppStateType) => {
    return (state.equipment.isLoading)
}

export const getReestrDataSelector = (state: AppStateType) => {
    return (state.equipment.reestrData)
}

export const getTechInfo = (state: AppStateType) => {
    return (state.equipment.technicalInfo)
}

export const getPhotosSelector = (state: AppStateType) => {
    return (state.equipment.photos)
}

export const getEquipById = (state: AppStateType, id: string | undefined ='0') => {
    const allEquipmentData = getEquipData(state); // Используем существующий селектор для получения всего массива данных
  
    // Ищем объект с заданным id в массиве
    const equipWithId = allEquipmentData.find(e => e.id === id);
  
    return equipWithId; // Возвращаем объект или null, если не найден
};