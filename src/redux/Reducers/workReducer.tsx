import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { getPremises } from "./premisesReducer"
import { workAPI } from "../../api/workAPI"
import { getEquipment } from "./equipmentReducer"
import { getSystems } from "./systemsReducer"
import { getProcesses } from "./processesReducer"
import { logout } from "./authReducer"

export type WorkChangesDataType = {
    id: string
    taskChangeType: 'vp' | 'nvp' | 'dvp' | 'vo' | 'nvo' | 'dvo' | 'pam' | 'pam2' | 'et' | 'isCardUpdated' | 'season'
    changeTime: string
    fio: string
    objectType: 'equipment' | 'premises' | 'systems' | 'processes'
    objectId: string
}

const initialState = {
    errorMessage: null as string | null,
    workChanges: [] as WorkChangesDataType[]
}

type InitialStateType = typeof initialState
export const workReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'work/SET_WORK_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'work/SET_WORK_CHANGES_DATA':
            return { ...state, workChanges: action.items }
        default:
            return state
    }
}

export const setSuccessTask = (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await workAPI.setSuccessTask(objectId, objectType)
    if (data.resultCode === 0) {
        if (objectType === 'equipment') { dispatch(getEquipment()) }
        else if (objectType === 'premises') { dispatch(getPremises()) }
        else if (objectType === 'systems') { dispatch(getSystems()) }
        else if (objectType === 'processes') { dispatch(getProcesses()) }
    } else if (data.resultCode === 1) {
        dispatch(workActions.setWorkErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setCancelTask = (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await workAPI.setCancelTask(objectId, objectType)
    if (data.resultCode === 0) {
        if (objectType === 'equipment') { dispatch(getEquipment()) }
        else if (objectType === 'premises') { dispatch(getPremises()) }
        else if (objectType === 'systems') { dispatch(getSystems()) }
        else if (objectType === 'processes') { dispatch(getProcesses()) }
    } else if (data.resultCode === 1) {
        dispatch(workActions.setWorkErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getWorkChanges = (): ThunkType => async (dispatch) => {
    let data = await workAPI.getWorkChanges()
    if (data.resultCode === 0) {
        dispatch(workActions.setWorkChangesData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(workActions.setWorkErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

type ActionTypes = InferActionsTypes<typeof workActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const workActions = {
    setWorkErrorMessage: (text: string | null) => ({ type: 'work/SET_WORK_ERROR_MESSAGE', text } as const),
    setWorkChangesData: (items: WorkChangesDataType[]) => ({ type: 'work/SET_WORK_CHANGES_DATA', items } as const),
}