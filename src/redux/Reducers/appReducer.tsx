import { ThunkAction } from "redux-thunk";
import { appAPI } from "../../api/appAPI";
import { AppStateType, InferActionsTypes } from "../store";

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

export type PremModesType = {
    id: string
    type: string
    low: string
    hight: string
    isactive: string
}

export type IntervalsType = {
    value: string
    label: string
    interval: string
}

export type AllValidatorsType = {
    id: string
    fio: string
    position: string
    access: string
}

export type VacationsType = {
    id: string
    fio: string
    month: string
    date: string
}

const initialState = {
    isInitialized: true,
    equipGroups: [] as EquipGroup[],
    departments: [] as DepartmentsType[],
    vmpDepartments: [] as VMPDepartmentsType[],
    intervals: [
        { value: '0', label: 'Не валидируется', interval: '0' },
        { value: '0,5', label: '1 раз в год c промежуточным контролем', interval: '13' },
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
    ] as IntervalsType[],
    premModes: [] as PremModesType[],
    sopCodeForm: '',
    allValidators: [] as AllValidatorsType[],
    vacationsData: [] as VacationsType[],
    vacationsIsLoading: false
}

type InitialStateType = typeof initialState
export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'app/SET_EQUIP_GROUPS':
            return { ...state, equipGroups: action.data }
        case 'app/SET_DEPARTMENTS':
            return { ...state, departments: action.data }
        case 'app/SET_VMP_DEPARTMENTS':
            return { ...state, vmpDepartments: action.data }
        case 'app/SET_PREM_MODES':
            return { ...state, premModes: action.data }
        case 'app/SET_SOP_CODE_FORM':
            return { ...state, sopCodeForm: action.data }
        case 'app/SET_ALL_VALIDATORS':
            return { ...state, allValidators: action.data }
        case 'app/SET_VACATIONS_VATA':
            return { ...state, vacationsData: action.data, vacationsIsLoading: false }
        case 'app/SET_VACATIONS_IS_LOADING':
            return { ...state, vacationsIsLoading: true }
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

export const getPremModes = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getPremModes()
    dispatch(appActions.setPremModes(data.modes))
}

export const getVMPDepartments = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getVMPDepartments()
    dispatch(appActions.setVMPDepartments(data.items))
}

export const getSopCodeForm = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getSopCodeForm()
    dispatch(appActions.setSopCodeForm(data.code))
}

export const getAllValidators = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getAllValidators()
    dispatch(appActions.setAllValidators(data.items))
}

export const getVacationsData = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.getVacationsData()
    dispatch(appActions.setVacationsData(data.items))
}

export const setVacationsData = (fio: string, dates: string, month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.setVacationsData(fio, dates, month)
    dispatch(appActions.setVacationsData(data.items))
}

export const deleteVacationsData = (fio: string, month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.deleteVacationsData(fio, month)
    dispatch(appActions.setVacationsData(data.items))
}

type ActionTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

const appActions = {
    setEquipGroups: (data: EquipGroup[]) => ({ type: 'app/SET_EQUIP_GROUPS', data } as const),
    setDepartments: (data: DepartmentsType[]) => ({ type: 'app/SET_DEPARTMENTS', data } as const),
    setVMPDepartments: (data: VMPDepartmentsType[]) => ({ type: 'app/SET_VMP_DEPARTMENTS', data } as const),
    setPremModes: (data: PremModesType[]) => ({ type: 'app/SET_PREM_MODES', data } as const),
    setSopCodeForm: (data: string) => ({ type: 'app/SET_SOP_CODE_FORM', data } as const),
    setAllValidators: (data: AllValidatorsType[]) => ({ type: 'app/SET_ALL_VALIDATORS', data } as const),
    setVacationsData: (data: VacationsType[]) => ({ type: 'app/SET_VACATIONS_VATA', data } as const),
    setVacationsIsLoading: () => ({ type: 'app/SET_VACATIONS_IS_LOADING' } as const),
}