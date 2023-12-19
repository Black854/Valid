import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { instrumentsAPI } from "../../api/instrumentsAPI"

export type DataType = {
    id: string
    name: string
    name2: string
    quantity: string
    date1: string
    date2: string
    foto: string
    certificate: string
    manual: string
    manufacturer: string
    manufacturdate: string
    serial: string
    invno: string
}

type PhotosType = {
    id: string
    idfromtable: string
    src: string
    name: string
}

let initialState = {
    data: [] as DataType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
}

type InitialStateType = typeof initialState

export const instrumentsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'inst/PUSH_INSTRUMENTS_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'inst/IS_LOADING':
            return {...state, isLoading: true}         
        case 'inst/SET_TECH_INFO':
            return {...state, technicalInfo: action.text}
        case 'inst/SET_PHOTOS':
            return {...state, photos: action.data}
        case 'inst/SET_PHOTOS_WHEN_PHOTO_IS_DOWNLOADING':
            return {...state, photos: [action.data, ...state.photos]}
        default:
            return state
    }
}

export const getInstruments = (): ThunkType => async (dispatch) => {
    dispatch (instActions.setIsLoading())
    let data = await instrumentsAPI.getInstruments()
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.uploadMainPhoto(id, file)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.deleteMainPhoto(id)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, name)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateName2 = (id: string, name2: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, name2)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateQuantity = (id: string, quantity: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, quantity)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateStartDate = (id: string, date1: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, date1)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateEndDate = (id: string, date2: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, date2)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, manufacturer)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, manufacturDate)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, serial)
    dispatch (instActions.pushInstrumentsData(data.items))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => { 
    let data = await instrumentsAPI.getTechnicalInfo(id)
    dispatch(instActions.setTechnicalInfo(data.tech))
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => { 
    let data = await instrumentsAPI.updateTechnicalInfo(id, text)
    dispatch(instActions.setTechnicalInfo(data.tech))
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => { 
    let data = await instrumentsAPI.getPhotos(id)
    dispatch(instActions.setPhotosData(data.photos))
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.uploadPhotos(id, file)
    dispatch(instActions.setPhotosData(data.photos))
}

export const updatePhotosDataWhenPhotoIsDownloading = (): ThunkType => async (dispatch) => {
    const uploadingObject = {
        id: '99998',
        idfromtable: '',
        src: '',
        name: ''
    }
    dispatch(instActions.updatePhotosDataWhenPhotoIsDownloading(uploadingObject))
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => { 
    let data = await instrumentsAPI.deletePhoto(id, photoId)
    dispatch(instActions.setPhotosData(data.photos))
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => { 
    let data = await instrumentsAPI.updatePdfDescription(photoId, text, id)
    dispatch(instActions.setPhotosData(data.photos))
}

type ActionTypes = InferActionsTypes<typeof instActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const instActions = {
    pushInstrumentsData: (data: DataType[]) => ({ type: 'inst/PUSH_INSTRUMENTS_DATA', data } as const),
    setIsLoading: () => ({ type: 'inst/IS_LOADING' } as const),
    setTechnicalInfo: (text: string) => ({ type: 'inst/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'inst/SET_PHOTOS', data } as const),
    updatePhotosDataWhenPhotoIsDownloading: (data: PhotosType) => ({ type: 'inst/SET_PHOTOS_WHEN_PHOTO_IS_DOWNLOADING', data } as const)
}