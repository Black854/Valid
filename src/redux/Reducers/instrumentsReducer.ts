import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { instrumentsAPI } from "../../api/instrumentsAPI"
import { logout } from "./authReducer"

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

export type NewInstObjectType = {
    name: string,
    name2: string,
    serial: string
}

let initialState = {
    data: [] as DataType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    errorMessage: null as string | null,
    createNewObjectErrorMessage: null as string | null,
    instCardError: null as string | null,
}

type InitialStateType = typeof initialState

export const instrumentsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'inst/PUSH_INSTRUMENTS_DATA':
            return { ...state, data: action.data }
        case 'inst/IS_LOADING':
            return { ...state, isLoading: action.data }
        case 'inst/SET_TECH_INFO':
            return { ...state, technicalInfo: action.text }
        case 'inst/SET_PHOTOS':
            return { ...state, photos: action.data }
        case 'inst/SET_PHOTOS_WHEN_PHOTO_IS_DOWNLOADING':
            return { ...state, photos: [action.data, ...state.photos] }
        case 'inst/SET_INST_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'inst/SET_CREATE_NEW_INST_ERROR_MESSAGE':
            return { ...state, createNewObjectErrorMessage: action.text }
        case 'inst/SET_INST_CARD_ERROR':
            return { ...state, instCardError: action.text }
        default:
            return state
    }
}

export const getInstruments = (): ThunkType => async (dispatch) => {
    dispatch(instActions.setIsLoading(true))
    let data = await instrumentsAPI.getInstruments()
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(instActions.setIsLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.uploadMainPhoto(id, file)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.deleteMainPhoto(id)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, name)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateName2 = (id: string, name2: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, name2)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateQuantity = (id: string, quantity: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, quantity)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateStartDate = (id: string, date1: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, date1)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateEndDate = (id: string, date2: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, date2)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, manufacturer)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, manufacturDate)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, serial)
    if (data.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.getTechnicalInfo(id)
    if (data.resultCode === 0) {
        dispatch(instActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updateTechnicalInfo(id, text)
    if (data.resultCode === 0) {
        dispatch(instActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.getPhotos(id)
    if (data.resultCode === 0) {
        dispatch(instActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.uploadPhotos(id, file)
    if (data.resultCode === 0) {
        dispatch(instActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
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
    if (data.resultCode === 0) {
        dispatch(instActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => {
    let data = await instrumentsAPI.updatePdfDescription(photoId, text, id)
    if (data.resultCode === 0) {
        dispatch(instActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(instActions.setInstCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const createNewObject = (data: NewInstObjectType): ThunkType => async (dispatch) => {
    dispatch(instActions.setIsLoading(true))
    const responseData = await instrumentsAPI.createNewObject(data)
    if (responseData.resultCode === 0) {
        dispatch(instActions.pushInstrumentsData(responseData.items))
    } else if (responseData.resultCode === 1) {
        dispatch(instActions.setCreateNewObjectErrorMessage(responseData.messages[0]))
    } else if (responseData.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(instActions.setIsLoading(false))
}

type ActionTypes = InferActionsTypes<typeof instActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const instActions = {
    pushInstrumentsData: (data: DataType[]) => ({ type: 'inst/PUSH_INSTRUMENTS_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'inst/IS_LOADING', data } as const),
    setTechnicalInfo: (text: string) => ({ type: 'inst/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'inst/SET_PHOTOS', data } as const),
    updatePhotosDataWhenPhotoIsDownloading: (data: PhotosType) => ({ type: 'inst/SET_PHOTOS_WHEN_PHOTO_IS_DOWNLOADING', data } as const),
    setInstErrorMessage: (text: string | null) => ({ type: 'inst/SET_INST_ERROR_MESSAGE', text } as const),
    setCreateNewObjectErrorMessage: (text: string | null) => ({ type: 'inst/SET_CREATE_NEW_INST_ERROR_MESSAGE', text } as const),
    setInstCardError: (text: string | null) => ({ type: 'inst/SET_INST_CARD_ERROR', text } as const),
}