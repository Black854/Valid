import { appAPI } from "../api/appAPI";
import { AppStateType } from "./store";

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

const initialState = {
    isInitialized: true,
    equipGroups: [] as EquipGroup[],
    departments: [] as DepartmentsType[],
    vmpDepartments: [] as VMPDepartmentsType[]
}

type InitialStateType = typeof initialState
const appReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'SET_EQUIP_GROUPS':
            return {...state, equipGroups: action.data}
        case 'SET_DEPARTMENTS':
            return {...state, departments: action.data}
        case 'SET_VMP_DEPARTMENTS':
            return {...state, vmpDepartments: action.data}
        default:
            return state
    }
}

export const getEquipGroups = (type: 'active' | 'all') => async (dispatch: any) => {
    let data = await appAPI.getEquipGroups(type)
    dispatch(setEquipGroups(data.groups))
}

export const getDepartments = () => async (dispatch: any) => {
    let data = await appAPI.getDepartments()
    dispatch(setDepartments(data.items))
}

export const getVMPDepartments = () => async (dispatch: any) => {
    let data = await appAPI.getVMPDepartments()
    dispatch(setVMPDepartments(data.items))
}

const setEquipGroups = ( data: EquipGroup[] ) => ({type: 'SET_EQUIP_GROUPS', data})
const setDepartments = ( data: DepartmentsType[] ) => ({type: 'SET_DEPARTMENTS', data})
const setVMPDepartments = ( data: VMPDepartmentsType[] ) => ({type: 'SET_VMP_DEPARTMENTS', data})

export default appReducer