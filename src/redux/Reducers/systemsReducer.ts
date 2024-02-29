import { ThunkAction } from "redux-thunk"
import { systemsAPI } from "../../api/systemsAPI"
import { AppStateType, InferActionsTypes } from "../store"
import { VMPDataTypeForPlansComponent } from "./vmpReducer"
import { logout } from "./authReducer"
import { getWorkChanges } from "./workReducer"

export type SysDataType = {
    id: string
    sp: string
    sp2: string
    nomer: string
    name: string
    groupp: string
    fio: string
    manual: string
    foto: string
    manufacturer: string
    manufacturdate: string
    serial: string
    inv: string
    ar: string
    date: string
}

type PhotosType = {
    id: string
    idfromtable: string
    src: string
    name: string
}

export type SysReestrType = {
    dvo: string
    dvp: string
    et: string
    id: string
    idfromtable: string
    nvo: string
    nvp: string
    pam: string
    pam2: string
    period: string
    season: string
    typeval: string
    isCardUpdated: string
    vo: string
    vp: string
    type1?: VMPDataTypeForPlansComponent
    type2?: VMPDataTypeForPlansComponent
}

let initialState = {
    data: [] as SysDataType[],
    reestrData: [] as SysReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isReestrDataLoading: false,
    isDescriptionLoading: false,
    sysIdArrayAtWorkAtCurrentUser: [] as SysReestrType[],
    errorMessage: null as string | null,
    createNewObjectErrorMessage: null as string | null,
    sysCardError: null as string | null,
}

export type NewSysObjectType = {
    spVMP: string,
    sp: string,
    name: string,
    ar: string
}

type InitialStateType = typeof initialState

export const systemsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'sys/PUSH_SYS_DATA':
            return { ...state, data: action.data }
        case 'sys/IS_LOADING':
            return { ...state, isLoading: action.data }
        case 'sys/PUSH_REESTR_DATA':
            return { ...state, reestrData: action.data }
        case 'sys/SET_TECH_INFO':
            return { ...state, technicalInfo: action.text }
        case 'sys/SET_PHOTOS':
            return { ...state, photos: action.data }
        case 'sys/SET_IS_REESTR_DATA_LOADING':
            return { ...state, isReestrDataLoading: action.data }
        case 'sys/SET_SYS_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return { ...state, sysIdArrayAtWorkAtCurrentUser: action.data }
        case 'sys/SET_IS_DESCRIPTION_LOADING':
            return { ...state, isDescriptionLoading: action.data }
        case 'sys/SET_SYS_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'sys/SET_CREATE_NEW_SYS_ERROR_MESSAGE':
            return { ...state, createNewObjectErrorMessage: action.text }
        case 'sys/SET_SYS_CARD_ERROR':
            return { ...state, sysCardError: action.text }
        default:
            return state
    }
}

export const getSystems = (): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsLoading(true))
    let data = await systemsAPI.getSystems()
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsLoading(false))
}

export const getSysReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.getReestrData(id)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await systemsAPI.uploadMainPhoto(id, file)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.deleteMainPhoto(id)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateNomer = (id: string, nomer: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, nomer)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateManufacturer = (id: string, manufacturer: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, manufacturer)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateManufacturDate = (id: string, manufacturDate: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, manufacturDate)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateSerial = (id: string, serial: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, serial)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateInv = (id: string, inv: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateDescription(id, undefined, undefined, inv)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsDescriptionLoading(false))
}

export const updateGroup = (id: string, group: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, group)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsDescriptionLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.getTechnicalInfo(id)
    if (data.resultCode === 0) {
        dispatch(sysActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateTechnicalInfo(id, text)
    if (data.resultCode === 0) {
        dispatch(sysActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.getPhotos(id)
    if (data.resultCode === 0) {
        dispatch(sysActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => {
    let data = await systemsAPI.uploadPhotos(id, file)
    if (data.resultCode === 0) {
        dispatch(sysActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.deletePhoto(id, photoId)
    if (data.resultCode === 0) {
        dispatch(sysActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updatePdfDescription(photoId, text, id)
    if (data.resultCode === 0) {
        dispatch(sysActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsDescriptionLoading(false))
}

export const updateSysInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsDescriptionLoading(true))
    let data = await systemsAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsDescriptionLoading(false))
}

export const updateReestrDateSys = (id: string, sysId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDate(id, sysId, date, dateType)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const updateReestrDateSysTask = (id: string, sysId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDateTask(id, sysId, date, dateType)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeSys = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDocsCode(id, recordId, text, dataType)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeSysTask = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.updateReestrDocsCodeTask(id, recordId, text, dataType)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const uploadSysDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.uploadDocument(objectId, recordId, dataType, file)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const uploadSysTaskDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.uploadTaskDocument(objectId, recordId, dataType, file)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const deleteSysDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsReestrDataLoading(true))
    let data = await systemsAPI.deleteDocument(objectId, recordId, dataType, url)
    if (data.resultCode === 0) {
        dispatch(sysActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsReestrDataLoading(false))
}

export const getCurrentSysData = (mySysDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await systemsAPI.getCurrentSysData(mySysDataIdArray)
    if (data.resultCode === 0) {
        dispatch(sysActions.setSysIdArrayAtWorkAtCurrentUser(data.items))
    } else if (data.resultCode === 1) {
        dispatch(sysActions.setSysCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateSysWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2' | 'isCardUpdated', text: string): ThunkType => async (dispatch) => {
    let data = await systemsAPI.updateSysWorkData(recordId, changeParam, text)
    if (data.resultCode === 0) {
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        // dispatch(workActions.setWorkErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const createNewObject = (data: NewSysObjectType): ThunkType => async (dispatch) => {
    dispatch(sysActions.setIsLoading(true))
    const responseData = await systemsAPI.createNewObject(data)
    if (responseData.resultCode === 0) {
        dispatch(sysActions.pushSystemsData(responseData.items))
    } else if (responseData.resultCode === 1) {
        dispatch(sysActions.setCreateNewObjectErrorMessage(responseData.messages[0]))
    } else if (responseData.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(sysActions.setIsLoading(false))
}

export const setSysCardError = (text: string | null): ThunkType => async (dispatch) => {
    dispatch(sysActions.setSysCardError(text))
}

type ActionTypes = InferActionsTypes<typeof sysActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const sysActions = {
    pushSystemsData: (data: SysDataType[]) => ({ type: 'sys/PUSH_SYS_DATA', data } as const),
    pushReestrData: (data: SysReestrType[]) => ({ type: 'sys/PUSH_REESTR_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'sys/IS_LOADING', data } as const),
    setTechnicalInfo: (text: string) => ({ type: 'sys/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'sys/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'sys/SET_IS_REESTR_DATA_LOADING', data } as const),
    setSysIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'sys/SET_SYS_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: boolean) => ({ type: 'sys/SET_IS_DESCRIPTION_LOADING', data } as const),
    setSysErrorMessage: (text: string | null) => ({ type: 'sys/SET_SYS_ERROR_MESSAGE', text } as const),
    setCreateNewObjectErrorMessage: (text: string | null) => ({ type: 'sys/SET_CREATE_NEW_SYS_ERROR_MESSAGE', text } as const),
    setSysCardError: (text: string | null) => ({ type: 'sys/SET_SYS_CARD_ERROR', text } as const),
}