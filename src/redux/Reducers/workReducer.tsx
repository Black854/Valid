import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { getPremises } from "./premisesReducer"
import { workAPI } from "../../api/workAPI"
import { getEquipment } from "./equipmentReducer"
import { getSystems } from "./systemsReducer"
import { getProcesses } from "./processesReducer"

const initialState = {

}

type InitialStateType = typeof initialState
export const workReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        default:
            return state
    }
}

export const setSuccessTask = (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await workAPI.setSuccessTask(objectId, objectType)
    if (data.resultCode === '0') {
        if (objectType === 'equipment') { dispatch(getEquipment()) }
        else if (objectType === 'premises') { dispatch(getPremises()) }
        else if (objectType === 'systems') { dispatch(getSystems()) }
        else if (objectType === 'processes') { dispatch(getProcesses()) }
    }
}

export const setCancelTask = (objectId: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes'): ThunkType => async (dispatch) => {
    let data = await workAPI.setCancelTask(objectId, objectType)
    if (data.resultCode === '0') {
        if (objectType === 'equipment') { dispatch(getEquipment()) }
        else if (objectType === 'premises') { dispatch(getPremises()) }
        else if (objectType === 'systems') { dispatch(getSystems()) }
        else if (objectType === 'processes') { dispatch(getProcesses()) }
    }
}

type ActionTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const appActions = {
    // setEquipGroups: ( data: EquipGroup[] ) => ({type: 'app/SET_EQUIP_GROUPS', data} as const),
}