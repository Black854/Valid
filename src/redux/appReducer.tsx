import { ThunkAction } from "redux-thunk";
import { appAPI } from "../api/appAPI";
import { AppStateType, InferActionsTypes } from "./store";

type EquipGroup = {
    id: string
    name: string,
    name2: string,
    isactive: string
}

type DepartmentsType = {
    id: string
    name: string
    name2: string
    pos: string
    fio: string
    stat: string
}

type VMPDepartmentsType = {
    id: string
    vmpname1: string
    vmpname2: string
    vmptablename: string
    menuname: string
    code: string
    code2: string
    datevmp: string
    isactive: string
}

type PremClassesGroup = {

}

const initialState = {
    isInitialized: true,
    equipGroups: [] as EquipGroup[],
    premClassesGroups: [] as PremClassesGroup[],
    departments: [] as DepartmentsType[],
    vmpDepartments: [] as VMPDepartmentsType[],
    intervals: [
        { value: '0', label: 'Не валидируется', interval: '0' },
        { value: '0,5', label: '1 раз в год c промежуточным контролем', interval: '13'},
        { value: '13', label: '1 раз в полгода', interval: '7' },
        { value: '1', label: '1 раз в год', interval: '13' },
        { value: '2', label: '1 раз в 2 года', interval: '25' },
        { value: '3', label: '1 раз в 3 года', interval: '37' },
        { value: '4', label: '1 раз в 3 года (посезонно)', interval: '37' },
        { value: '5', label: '1 раз в 5 лет', interval: '61' },
        { value: '14', label: '1 раз в 5 лет (посезонно)', interval: '61' },
        { value: '16', label: '1 раз в 5 лет (без оформления ПОТС)', interval: '61' },
        { value: '10', label: 'По изменениям (с оформлением ПОТС)', interval: '0' },
        { value: '11', label: 'По изменениям (без оформления ПОТС)', interval: '0' },
        { value: '12', label: 'Законсервировано', interval: '0' },
        { value: '15', label: 'Списано', interval: '0' }
    ]
}

type InitialStateType = typeof initialState
export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'app/SET_EQUIP_GROUPS':
            return {...state, equipGroups: action.data}
        case 'app/SET_DEPARTMENTS':
            return {...state, departments: action.data}
        case 'app/SET_VMP_DEPARTMENTS':
            return {...state, vmpDepartments: action.data}
        default:
            return state
    }
}

export const getEquipGroups = (type: 'active' | 'all'): ThunkType => async (dispatch) => {
    let data = await appAPI.getEquipGroups(type)
    dispatch(appActions.setEquipGroups(data.groups))
}

export const getDepartments = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getDepartments()
    dispatch(appActions.setDepartments(data.items))
}

export const getVMPDepartments = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getVMPDepartments()
    dispatch(appActions.setVMPDepartments(data.items))
}

type ActionTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const appActions = {
    setEquipGroups: ( data: EquipGroup[] ) => ({type: 'app/SET_EQUIP_GROUPS', data} as const),
    setDepartments: ( data: DepartmentsType[] ) => ({type: 'app/SET_DEPARTMENTS', data} as const),
    setVMPDepartments: ( data: VMPDepartmentsType[] ) => ({type: 'app/SET_VMP_DEPARTMENTS', data} as const)
}