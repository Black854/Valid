import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { processesAPI } from "../../api/processesAPI"
import { VMPDataTypeForPlansComponent } from "./vmpReducer"
import { logout } from "./authReducer"
import { getWorkChanges } from "./workReducer"

export type ProcDataType = {
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

export type ProcReestrType = {
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
    data: [] as ProcDataType[],
    reestrData: [] as ProcReestrType[],
    isLoading: false,
    technicalInfo: '',
    photos: [] as PhotosType[],
    isReestrDataLoading: false,
    isDescriptionLoading: false,
    procIdArrayAtWorkAtCurrentUser: [] as ProcReestrType[],
    errorMessage: null as string | null,
    createNewObjectErrorMessage: null as string | null,
    procCardError: null as string | null,
}

export type NewProcObjectType = {
    spVMP: string,
    sp: string,
    name: string,
    ar: string
}

type InitialStateType = typeof initialState

export const processesReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'proc/PUSH_PROC_DATA':
            return { ...state, data: action.data }
        case 'proc/IS_LOADING':
            return { ...state, isLoading: action.data }
        case 'proc/PUSH_REESTR_DATA':
            return { ...state, reestrData: action.data }
        case 'proc/SET_TECH_INFO':
            return { ...state, technicalInfo: action.text }
        case 'proc/SET_PHOTOS':
            return { ...state, photos: action.data }
        case 'proc/SET_IS_REESTR_DATA_LOADING':
            return { ...state, isReestrDataLoading: action.data }
        case 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER':
            return { ...state, procIdArrayAtWorkAtCurrentUser: action.data }
        case 'proc/SET_IS_DESCRIPTION_LOADING':
            return { ...state, isDescriptionLoading: action.data }
        case 'proc/SET_PROC_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'proc/SET_CREATE_NEW_PROC_ERROR_MESSAGE':
            return { ...state, createNewObjectErrorMessage: action.text }
        case 'proc/SET_PROC_CARD_ERROR':
            return { ...state, procCardError: action.text }
        default:
            return state
    }
}

export const getProcesses = (): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsLoading(true))
    let data = await processesAPI.getProcesses()
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsLoading(false))
}

export const getProcReestrData = (id: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.getReestrData(id)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const uploadMainPhoto = (id: string, file: File): ThunkType => async (dispatch) => {
    let data = await processesAPI.uploadMainPhoto(id, file)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deleteMainPhoto = (id: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.deleteMainPhoto(id)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateName = (id: string, name: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, name)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsDescriptionLoading(false))
}

export const getTechnicalInfo = (id: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.getTechnicalInfo(id)
    if (data.resultCode === 0) {
        dispatch(procActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateTechnicalInfo = (id: string, text: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateTechnicalInfo(id, text)
    if (data.resultCode === 0) {
        dispatch(procActions.setTechnicalInfo(data.tech))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getPhotos = (id: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.getPhotos(id)
    if (data.resultCode === 0) {
        dispatch(procActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const uploadPhotos = (id: string, file: any): ThunkType => async (dispatch) => {
    let data = await processesAPI.uploadPhotos(id, file)
    if (data.resultCode === 0) {
        dispatch(procActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deletePhoto = (id: string, photoId: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.deletePhoto(id, photoId)
    if (data.resultCode === 0) {
        dispatch(procActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updatePdfDescription = (photoId: string, text: string, id: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updatePdfDescription(photoId, text, id)
    if (data.resultCode === 0) {
        dispatch(procActions.setPhotosData(data.photos))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateDepartment = (id: string, department: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, department)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsDescriptionLoading(false))
}

export const updateVMPDepartment = (id: string, VMPdepartment: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, VMPdepartment)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsDescriptionLoading(false))
}

export const updateProcInterval = (id: string, interval: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsDescriptionLoading(true))
    let data = await processesAPI.updateDescription(id, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, interval)
    if (data.resultCode === 0) {
        dispatch(procActions.pushProcessesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsDescriptionLoading(false))
}

export const updateReestrDateProc = (id: string, procId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDate(id, procId, date, dateType)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const updateReestrDateProcTask = (id: string, procId: string, date: string, dateType: 'dvp' | 'dvo'): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDateTask(id, procId, date, dateType)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeProc = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDocsCode(id, recordId, text, dataType)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const updateReestrDocsCodeProcTask = (id: string, recordId: string, text: string, dataType: 'nvo' | 'nvp'): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.updateReestrDocsCodeTask(id, recordId, text, dataType)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const uploadProcDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.uploadDocument(objectId, recordId, dataType, file)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const uploadProcTaskDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', file: any): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.uploadTaskDocument(objectId, recordId, dataType, file)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const deleteProcDocument = (objectId: string, recordId: string, dataType: 'vo' | 'vp' | 'pam', url: string): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsReestrDataLoading(true))
    let data = await processesAPI.deleteDocument(objectId, recordId, dataType, url)
    if (data.resultCode === 0) {
        dispatch(procActions.pushReestrData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsReestrDataLoading(false))
}

export const getCurrentProcData = (myProcDataIdArray: Array<string>): ThunkType => async (dispatch) => {
    let data = await processesAPI.getCurrentProcData(myProcDataIdArray)
    if (data.resultCode === 0) {
        dispatch(procActions.setProcIdArrayAtWorkAtCurrentUser(data.items))
    } else if (data.resultCode === 1) {
        dispatch(procActions.setProcCardError(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateProcWorkData = (recordId: string, changeParam: 'et' | 'season' | 'pam2' | 'isCardUpdated', text: string): ThunkType => async (dispatch) => {
    let data = await processesAPI.updateProcWorkData(recordId, changeParam, text)
    if (data.resultCode === 0) {
        dispatch(getWorkChanges())
    } else if (data.resultCode === 1) {
        // dispatch(workActions.setWorkErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const createNewObject = (data: NewProcObjectType): ThunkType => async (dispatch) => {
    dispatch(procActions.setIsLoading(true))
    const responseData = await processesAPI.createNewObject(data)
    if (responseData.resultCode === 0) {
        dispatch(procActions.pushProcessesData(responseData.items))
    } else if (responseData.resultCode === 1) {
        dispatch(procActions.setCreateNewObjectErrorMessage(responseData.messages[0]))
    } else if (responseData.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(procActions.setIsLoading(false))
}

export const setProcCardError = (text: string | null): ThunkType => async (dispatch) => {
    dispatch(procActions.setProcCardError(text))
}

type ActionTypes = InferActionsTypes<typeof procActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const procActions = {
    pushProcessesData: (data: ProcDataType[]) => ({ type: 'proc/PUSH_PROC_DATA', data } as const),
    pushReestrData: (data: ProcReestrType[]) => ({ type: 'proc/PUSH_REESTR_DATA', data } as const),
    setIsLoading: (data: boolean) => ({ type: 'proc/IS_LOADING', data } as const),
    setTechnicalInfo: (text: string) => ({ type: 'proc/SET_TECH_INFO', text } as const),
    setPhotosData: (data: PhotosType[]) => ({ type: 'proc/SET_PHOTOS', data } as const),
    setIsReestrDataLoading: (data: boolean) => ({ type: 'proc/SET_IS_REESTR_DATA_LOADING', data } as const),
    setProcIdArrayAtWorkAtCurrentUser: (data: any) => ({ type: 'proc/SET_PROC_ID_ARRAY_AT_WORK_AT_CURRENT_USER', data } as const),
    setIsDescriptionLoading: (data: any) => ({ type: 'proc/SET_IS_DESCRIPTION_LOADING', data } as const),
    setProcErrorMessage: (text: string | null) => ({ type: 'proc/SET_PROC_ERROR_MESSAGE', text } as const),
    setCreateNewObjectErrorMessage: (text: string | null) => ({ type: 'proc/SET_CREATE_NEW_PROC_ERROR_MESSAGE', text } as const),
    setProcCardError: (text: string | null) => ({ type: 'proc/SET_PROC_CARD_ERROR', text } as const)
}