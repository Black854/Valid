import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { vmpAPI } from "../../api/vmpAPI"

export type VMPDataType = {
    id: string
    name: string
    tablename: string
    idfromtable: string
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

const initialState = {
    VMPData: [] as VMPDataType[]
}

type InitialStateType = typeof initialState
export const vmpReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'vmp/SET_VMP_DATA':
            return { ...state, VMPData: action.data }
        default:
            return state
    }
}

export const getVMPData = (tablename: string, year: string): ThunkType => async (dispatch) => {
    let data = await vmpAPI.getVMPData(tablename, year)
    dispatch(vmpActions.setVMPData(data.items))
}

type ActionTypes = InferActionsTypes<typeof vmpActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const vmpActions = {
    setVMPData: (data: VMPDataType[]) => ({ type: 'vmp/SET_VMP_DATA', data } as const),
}