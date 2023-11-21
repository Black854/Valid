import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "../store"
import { plansAPI } from "../../api/plansAPI"

export type MonthListItem = {
    month: string
}

export type PlansType = {
    name: string
    nomer: string
    class: string
    sp: string
    sp2: string
    foto: string
    date: string
    date2: string
    doc: string
    fio: string
    id: string
    idfromtable: string
    month: string
    status: string
    tablename: string
}

const initialState = {
    monthList: [] as Array<MonthListItem>,
    plans: [] as PlansType[]
}

type InitialStateType = typeof initialState
export const plansReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'plans/SET_MONTH_LIST':
            return { ...state, monthList: action.data }
        case 'plans/SET_PLANS':
            return { ...state, plans: action.data }
        default:
            return state
    }
}

export const getMonthList = (): ThunkType => async (dispatch) => {
    let data = await plansAPI.getMonthList()
    dispatch(plansActions.setMonthList(data.items))
}

export const getPlans = (month: string): ThunkType => async (dispatch) => {
    let data = await plansAPI.getPlans(month)
    dispatch(plansActions.setPlans(data.items))
}

export const updatePlansFio = (fio: string, objectId: string, tableName: string, recordId: string, month: string): ThunkType => async (dispatch) => {
    let data = await plansAPI.updatePlansFio(fio, objectId, tableName, recordId, month)
    dispatch(plansActions.setPlans(data.items))
}

export const updatePlansDoc = (doc: string, objectId: string, tableName: string, recordId: string, month: string): ThunkType => async (dispatch) => {
    let data = await plansAPI.updatePlansDoc(doc, objectId, tableName, recordId, month)
    dispatch(plansActions.setPlans(data.items))
}

export const updatePlansDates = (startDate: string, endDate: string, objectId: string, tableName: string, recordId: string, month: string): ThunkType => async (dispatch) => {
    let data = await plansAPI.updatePlansDates(startDate, endDate, objectId, tableName, recordId, month)
    dispatch(plansActions.setPlans(data.items))
}

export const updateReportStatus = (status: string, objectId: string, tableName: string, recordId: string, month: string): ThunkType => async (dispatch) => {
    let data = await plansAPI.updateReportStatus(status, objectId, tableName, recordId, month)
    dispatch(plansActions.setPlans(data.items))
}

type ActionTypes = InferActionsTypes<typeof plansActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const plansActions = {
    setMonthList: (data: MonthListItem[]) => ({ type: 'plans/SET_MONTH_LIST', data } as const),
    setPlans: (data: PlansType[]) => ({ type: 'plans/SET_PLANS', data } as const),
}