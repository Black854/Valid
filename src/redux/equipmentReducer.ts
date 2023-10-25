import { equipmentAPI } from "../api/equipmentAPI"

type DataType = {
    id: string,
    sp: string,
    sp2: string,
    nomer: string,
    name: string,
    groupp: string,
    fio: string,
    manual: string,
    foto: string,
    manufacturer: string,
    manufacturdate: string,
    serial: string,
    inv: string,
    ar: string,
    date: string
}

type PhotosType = {
    id: string,
    idfromtable: string,
    src: string,
    name: string
}

let initialState = {
    data: [] as Array<DataType>,
    reestrData: [],
    isLoading: false,
    technicalInfo: '',
    photos: [] as Array<PhotosType>,
    isDepartmentLoading: false,
    isVMPDepartmentLoading: false,
    isGroupLoading: false,
}

type InitialStateType = typeof initialState

const equipmentReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'PUSH_EQ_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'IS_LOADING':
            return {...state, isLoading: true}
        case 'PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}            
        case 'SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'SET_PHOTOS':
            return {...state, photos: action.data}
        case 'SET_IS_DEPARTMENT_LOADING':
            return {...state, isDepartmentLoading: action.data}
        case 'SET_IS_VMP_DEPARTMENT_LOADING':
            return {...state, isVMPDepartmentLoading: action.data}
        case 'SET_IS_GROUP_LOADING':
            return {...state, isGroupLoading: action.data}
        default:
            return state
    }
}

export const getEquipment = () => async (dispatch: any) => {
    dispatch (setIsLoading())
    let data = await equipmentAPI.getEquipment()
    dispatch (pushEquipmentData(data.items))
}

export const getReestrData = (id: string) => async (dispatch: any) => {
    let data = await equipmentAPI.getReestrData(id)
    dispatch (pushReestrData(data.items))
}

export const uploadMainPhoto = (id: string, file: File) => async (dispatch: any) => {
    let data = await equipmentAPI.uploadMainPhoto(id, file)
    dispatch (pushEquipmentData(data.items))
}

export const deleteMainPhoto = (id: string) => async (dispatch: any) => {
    let data = await equipmentAPI.deleteMainPhoto(id)
    dispatch (pushEquipmentData(data.items))
}

export const updateNomer = (id: string, nomer: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, nomer)
    dispatch (pushEquipmentData(data.items))
}

export const updateManufacturer = (id: string, manufacturer: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, manufacturer)
    dispatch (pushEquipmentData(data.items))
}

export const updateManufacturDate = (id: string, manufacturDate: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, manufacturDate)
    dispatch (pushEquipmentData(data.items))
}

export const updateSerial = (id: string, serial: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, undefined, serial)
    dispatch (pushEquipmentData(data.items))
}

export const updateInv = (id: string, inv: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, inv)
    dispatch (pushEquipmentData(data.items))
}

export const updateName = (id: string, name: string) => async (dispatch: any) => { //обновление данных о местоположении
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    dispatch (pushEquipmentData(data.items))
}

export const updateGroup = (id: string, group: string) => async (dispatch: any) => {
    dispatch (setIsGroupLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, group)
    dispatch (pushEquipmentData(data.items))
    dispatch (setIsGroupLoading(false))
}

export const getTechnicalInfo = (id: string) => async (dispatch: any) => { 
    let data = await equipmentAPI.getTechnicalInfo(id)
    dispatch(setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string) => async (dispatch: any) => { 
    let data = await equipmentAPI.updateTechnicalInfo(id, text)
    dispatch(setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string) => async (dispatch: any) => { 
    let data = await equipmentAPI.getPhotos(id)
    dispatch(setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any) => async (dispatch: any) => { 
    let data = await equipmentAPI.uploadPhotos(id, file)
    dispatch(setPhotosData(data.photos))
}

export const deletePhoto = (id: string, photoId: string) => async (dispatch: any) => { 
    let data = await equipmentAPI.deletePhoto(id, photoId)
    dispatch(setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string) => async (dispatch: any) => { 
    let data = await equipmentAPI.updatePdfDescription(photoId, text, id)
    dispatch(setPhotosData(data.photos))
}

export const updateDepartment = (id: string, department: string) => async (dispatch: any) => {
    dispatch (setIsDepartmentLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    dispatch (pushEquipmentData(data.items))
    dispatch (setIsDepartmentLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string) => async (dispatch: any) => {
    dispatch (setIsVMPDepartmentLoading(true))
    let data = await equipmentAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    dispatch (pushEquipmentData(data.items))
    dispatch (setIsVMPDepartmentLoading(false))
}

const pushEquipmentData = (data: any) => {
    return {
        type: 'PUSH_EQ_DATA',
        data
    }
}

const pushReestrData = (data: any) => {
    return {
        type: 'PUSH_REESTR_DATA',
        data
    }
}

const setIsLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

const setTechnicalInfo = (text: string) => {
    return {
        type: 'SET_TECH_INFO',
        text
    }
}

const setPhotosData = (data: Array<PhotosType>) => {
    return {
        type: 'SET_PHOTOS',
        data
    }
}

const setIsDepartmentLoading = (data: boolean) => {
    return {
        type: 'SET_IS_DEPARTMENT_LOADING',
        data
    }
}

const setIsVMPDepartmentLoading = (data: boolean) => {
    return {
        type: 'SET_IS_VMP_DEPARTMENT_LOADING',
        data
    }
}

const setIsGroupLoading = (data: boolean) => {
    return {
        type: 'SET_IS_GROUP_LOADING',
        data
    }
}

export default equipmentReducer

