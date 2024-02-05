import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { vmpAPI } from "../../api/vmpAPI"
import { logout } from "./authReducer"
import { setEquipCardError } from "./equipmentReducer"
import { setPremCardError } from "./premisesReducer"
import { setSysCardError } from "./systemsReducer"
import { setProcCardError } from "./processesReducer"

export type VMPDataType = {
    id: string
    vo: string
    name: string
    tablename: string
    idfromtable: string
    typeval: string
    status: string
    codedoc: string
    0: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
}

export type VMPDataTypeForPlansComponent = {
    id: string
    idfromtable: string
    name: string
    tablename: string
    typeval: string
    1: string
    2: string
    3: string
    4: string
    5: string
    6: string
    7: string
    8: string
    9: string
    10: string
    11: string
    12: string
}

export type ChangeListDataType = {
    id: string
    type: string
    year: string
    changes: string
    fio: string
    date: string
    date2: string
    version: string
    doc: string
    print: string
}

const initialState = {
    VMPData: [] as VMPDataType[],
    objectVMPPlansData: [] as VMPDataType[],
    objectNextYearVMPPlansData: [] as VMPDataType[],
    errorMessage: null as string | null,
    vmpChangeList: [] as ChangeListDataType[],
}

type InitialStateType = typeof initialState
export const vmpReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'vmp/SET_VMP_DATA':
            return { ...state, VMPData: action.data }
        case 'vmp/SET_OBJECT_VMP_PLANS_DATA':
            return { ...state, objectVMPPlansData: action.data }
        case 'vmp/SET_VMP_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'vmp/SET_OBJECT_NEXT_YEAR_VMP_PLANS_DATA':
            return { ...state, objectNextYearVMPPlansData: action.data }
        case 'vmp/SET_VMP_CHANGE_LIST':
            return {...state, vmpChangeList: action.data}
        default:
            return state
    }
}

export const getVMPData = (tablename: string, year: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.getVMPData(tablename, year)
    if (data.resultCode === 0) {
        dispatch(vmpActions.setVMPData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(vmpActions.setVMPErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getObjectVMPPlansData = (objectId: string, sp: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await vmpAPI.getObjectVMPPlansData(objectId, sp, objectType)
    if (data.resultCode === 0) {
        dispatch(vmpActions.setObjectVMPPlansData(data.items))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getObjectNextYearVMPPlansData = (objectId: string, sp: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await vmpAPI.getObjectNextYearVMPPlansData(objectId, sp, objectType)
    if (data.resultCode === 0) {
        dispatch(vmpActions.setObjectNextYearVMPPlansData(data.items))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateVMPPlansData = (daysCount: number, month: number, recordId: string, sp: string, objectId: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes', objectName: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.updateVMPPlansData(daysCount, month, recordId, sp, objectName)
    if (data.resultCode === 0) {
        dispatch(getObjectVMPPlansData(objectId, sp, objectType))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateVMPPlansNextYearData = (daysCount: number, month: number, recordId: string, sp: string, objectId: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes', objectName: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.updateVMPPlansNextYearData(daysCount, month, recordId, sp, objectName)
    if (data.resultCode === 0) {
        dispatch(getObjectNextYearVMPPlansData(objectId, sp, objectType))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const createVMPPlansData = (objectName: string, objectId: string, sp: string, typeval: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await vmpAPI.createVMPPlansData(objectName, objectId, sp, typeval, objectType)
    if (data.resultCode === 0) {
        dispatch(getObjectVMPPlansData(objectId, sp, objectType))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const createNextYearVMPPlansData = (objectName: string, objectId: string, sp: string, typeval: string, objectType: 'premises' | 'equipment' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await vmpAPI.createNextYearVMPPlansData(objectName, objectId, sp, typeval, objectType)
    if (data.resultCode === 0) {
        dispatch(getObjectNextYearVMPPlansData(objectId, sp, objectType))
    } else if (data.resultCode === 1) {
        if (objectType === 'equipment') {
            dispatch(setEquipCardError(data.messages[0]))
        } else if (objectType === 'premises') {
            dispatch(setPremCardError(data.messages[0]))
        } else if (objectType === 'systems') {
            dispatch(setSysCardError(data.messages[0]))
        } else if (objectType === 'processes') {
            dispatch(setProcCardError(data.messages[0]))
        }
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getVMPChangeList = (vmpId: string, vmpYear: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.getVMPChangeList(vmpId, vmpYear)
    if (data.resultCode === 0) {
        dispatch(vmpActions.setVMPChangeList(data.items))
    } else if (data.resultCode === 1) {
        dispatch(vmpActions.setVMPErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const updateChangeListData = (id: string, text: string, type: string, vmpId: string, vmpYear: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.updateChangeListData(id, text, type)
    if (data.resultCode === 0) {
        dispatch(getVMPChangeList(vmpId, vmpYear))
    } else if (data.resultCode === 1) {
        dispatch(vmpActions.setVMPErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

type ActionTypes = InferActionsTypes<typeof vmpActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const vmpActions = {
    setVMPData: (data: VMPDataType[]) => ({ type: 'vmp/SET_VMP_DATA', data } as const),
    setObjectVMPPlansData: (data: VMPDataType[]) => ({ type: 'vmp/SET_OBJECT_VMP_PLANS_DATA', data } as const),
    setObjectNextYearVMPPlansData: (data: VMPDataType[]) => ({ type: 'vmp/SET_OBJECT_NEXT_YEAR_VMP_PLANS_DATA', data } as const),
    setVMPErrorMessage: (text: string | null) => ({ type: 'vmp/SET_VMP_ERROR_MESSAGE', text } as const),
    setVMPChangeList: (data: ChangeListDataType[]) => ({ type: 'vmp/SET_VMP_CHANGE_LIST', data } as const),
}