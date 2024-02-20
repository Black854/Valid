import { ThunkAction } from "redux-thunk";
import { appAPI } from "../../api/appAPI";
import { AppStateType, InferActionsTypes } from "../store";
import { UseFormSetError } from "react-hook-form";
import { getEquipReestrData } from "./equipmentReducer";
import { getPremReestrData } from "./premisesReducer";
import { getProcReestrData } from "./processesReducer";
import { getSysReestrData } from "./systemsReducer";
import { TablePaginationConfig } from "antd";
import { logout } from "./authReducer";

export type EquipGroupsType = {
    id: string
    name: string,
    name2: string,
    isactive: string
}

export type DepartmentsType = {
    id: string
    name: string
    name2: string
    pos: string
    fio: string
    stat: string
}

export type VMPDepartmentsType = {
    id: string
    vmpname1: string
    vmpname2: string
    vmptablename: string
    menuname: string
    code: string
    code2: string
    datevmp: string
    isactive: string
    consumers: string
}

export type CodeSettingsType = {
    id: string
    codeform: string
    formname: string
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

export type MonthPlanObjectData = {
    isPlanned: boolean
    date1: string
    date2: string
    fio: string
    workType: string
}

export type UserActionsType = {
    id: string
    fio: string
    date: string
    type: string
    changes: string
    ip: string
}

export const defaultPagination = { defaultPageSize: 10, showQuickJumper: true, hideOnSinglePage: true, position: ["topRight"] } as TablePaginationConfig

const initialState = {
    isInitialized: false,
    server: 'http://10.85.10.212/ov/', // https://validcontrol.ru/   http://10.85.10.212/ov/ http://localhost:81/ov/ http://is.kphk.kz:81/ov/
    themeType: 'dark' as 'dark' | 'light',
    equipGroups: [] as EquipGroupsType[],
    departments: [] as DepartmentsType[],
    vmpDepartments: [] as VMPDepartmentsType[],
    intervals: [
        { value: '0', label: 'Не валидируется', interval: '0' },
        { value: '0,5', label: '1 раз в год c промежуточным контролем', interval: '12' },
        { value: '13', label: '1 раз в полгода', interval: '6' },
        { value: '1', label: '1 раз в год', interval: '12' },
        { value: '2', label: '1 раз в 2 года', interval: '24' },
        { value: '3', label: '1 раз в 3 года', interval: '36' },
        { value: '4', label: '1 раз в 3 года (посезонно)', interval: '36' },
        { value: '5', label: '1 раз в 5 лет', interval: '60' },
        { value: '14', label: '1 раз в 5 лет (посезонно)', interval: '60' },
        { value: '11', label: 'По изменениям', interval: '0' },
        { value: '12', label: 'Законсервировано', interval: '0' },
        { value: '15', label: 'Списано', interval: '0' }
    ] as IntervalsType[],
    premModes: [] as PremModesType[],
    sopCodeForm: '',
    allValidators: [] as AllValidatorsType[],
    vacationsData: [] as VacationsType[],
    codeSettingsData: [] as CodeSettingsType[],
    vacationsIsLoading: false,
    painterData: [],
    premModesIsLoading: false,
    equipGroupsIsLoading: false,
    departmentsIsLoading: false,
    VMPDepartmentsIsLoading: false,
    codeFormsIsLoading: false,
    addToMonthPlanIsLoading: false,
    monthPlanObjectData: null as MonthPlanObjectData | null,
    userActions: null as UserActionsType[] | null,
    userAccountsActions: null as UserActionsType[] | null,
    errorMessage: null as string | null,
    successMessage: null as string | null,
    loadingMessage: null as string | null,
    termSettings: null as string | null,
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
        case 'app/SET_THEME':
            return { ...state, themeType: action.themeType }
        case 'app/SET_PAINTER_DATA':
            return { ...state, painterData: action.data }
        case 'app/SET_CODE_SETTINGS_DATA':
            return { ...state, codeSettingsData: action.data }
        case 'app/SET_PREM_MODES_IS_LOADING':
            return { ...state, premModesIsLoading: action.status }
        case 'app/SET_EQUIP_GROUPS_IS_LOADING':
            return { ...state, equipGroupsIsLoading: action.status }
        case 'app/SET_CODEFORMS_IS_LOADING':
            return { ...state, codeFormsIsLoading: action.status }
        case 'app/SET_DEPARTMENTS_IS_LOADING':
            return { ...state, departmentsIsLoading: action.status }
        case 'app/SET_VMP_DEPARTMENTS_IS_LOADING':
            return { ...state, VMPDepartmentsIsLoading: action.status }
        case 'app/SET_ADD_TO_MONTH_PLAN_IS_LOADING':
            return { ...state, addToMonthPlanIsLoading: action.status }
        case 'app/SET_MONTH_PLAN_OBJECT_DATA':
            return { ...state, monthPlanObjectData: action.items }
        case 'app/SET_USER_ACTIONS':
            return { ...state, userActions: action.items }
        case 'app/SET_USER_ACCOUNTS_ACTIONS':
            return { ...state, userAccountsActions: action.items }
        case 'app/SET_IS_INITIALIZED_APP_STATUS':
            return { ...state, isInitialized: action.status }
        case 'app/SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.text }
        case 'app/SET_SUCCESS_MESSAGE':
            return { ...state, successMessage: action.text }
        case 'app/SET_LOADING_MESSAGE':
            return { ...state, loadingMessage: action.text }
        case 'app/SET_LABEL_TERM_SETTINGS':
            return {...state, termSettings: action.text}
        default:
            return state
    }
}

export const getEquipGroups = (type: 'active' | 'all'): ThunkType => async (dispatch) => {
    dispatch(appActions.setEquipGroupsIsLoading(true))
    let data = await appAPI.getEquipGroups(type)
    if (data.resultCode === 0) {
        dispatch(appActions.setEquipGroups(data.groups))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setEquipGroupsIsLoading(false))
}

export const getDepartments = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setDepartmentsIsLoading(true))
    let data = await appAPI.getDepartments()
    if (data.resultCode === 0) {
        dispatch(appActions.setDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setDepartmentsIsLoading(false))
}

export const getPremModes = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setPremModesIsLoading(true))
    let data = await appAPI.getPremModes()
    if (data.resultCode === 0) {
        dispatch(appActions.setPremModes(data.modes))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setPremModesIsLoading(false))
}

export const getVMPDepartments = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setVMPDepartmentsIsLoading(true))
    let data = await appAPI.getVMPDepartments()
    if (data.resultCode === 0) {
        dispatch(appActions.setVMPDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setVMPDepartmentsIsLoading(false))
}

export const getSopCodeForm = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getSopCodeForm()
    if (data.resultCode === 0) {
        dispatch(appActions.setSopCodeForm(data.code))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getAllValidators = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getAllValidators()
    if (data.resultCode === 0) {
        dispatch(appActions.setAllValidators(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getVacationsData = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.getVacationsData()
    if (data.resultCode === 0) {
        dispatch(appActions.setVacationsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setVacationsData = (fio: string, dates: string, month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.setVacationsData(fio, dates, month)
    if (data.resultCode === 0) {
        dispatch(appActions.setVacationsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const deleteVacationsData = (fio: string, month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setVacationsIsLoading())
    let data = await appAPI.deleteVacationsData(fio, month)
    if (data.resultCode === 0) {
        dispatch(appActions.setVacationsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setTheme = (themeType: 'dark' | 'light'): ThunkType => async (dispatch) => {
    dispatch(appActions.setTheme(themeType))
}

export const getPainterData = (): ThunkType => async (dispatch) => {
    let data = await appAPI.getPainterData()
    if (data.resultCode === 0) {
        dispatch(appActions.setPainterData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setPainterData = (dataArray: any): ThunkType => async (dispatch) => {
    let data = await appAPI.setPainterData(dataArray)
    if (data.resultCode === 0) {
        dispatch(appActions.setPainterData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getCodeSettings = (): ThunkType => async (dispatch) => {
    dispatch(appActions.setCodeFormsIsLoading(true))
    let data = await appAPI.getCodeSettings()
    if (data.resultCode === 0) {
        dispatch(appActions.setCodeSettingsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setCodeFormsIsLoading(false))
}

export const setDepartmentsData = (id: string, name2?: string, pos?: string, fio?: string, stat?: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setDepartmentsIsLoading(true))
    let data = await appAPI.setDepartmentsData(id, name2, pos, fio, stat)
    if (data.resultCode === 0) {
        dispatch(appActions.setDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setDepartmentsIsLoading(false))
}

export const setVMPDepartmentsData = (id: string, vmpname1?: string, vmpname2?: string, code?: string, code2?: string, isactive?: string, menuname?: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setVMPDepartmentsIsLoading(true))
    let data = await appAPI.setVMPDepartmentsData(id, vmpname1, vmpname2, code, code2, isactive, menuname)
    if (data.resultCode === 0) {
        dispatch(appActions.setVMPDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setVMPDepartmentsIsLoading(false))
}

export const setCodeFormsData = (id: string, codeform: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setCodeFormsIsLoading(true))
    let data = await appAPI.setCodeFormsData(id, codeform)
    if (data.resultCode === 0) {
        dispatch(appActions.setCodeSettingsData(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setCodeFormsIsLoading(false))
}

export const setPremModesData = (id: string, type?: string, low?: string, hight?: string, isactive?: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setPremModesIsLoading(true))
    let data = await appAPI.setPremModesData(id, type, low, hight, isactive)
    if (data.resultCode === 0) {
        dispatch(appActions.setPremModes(data.modes))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setPremModesIsLoading(false))
}

export const setEquipGroupsData = (id: string, name?: string, isactive?: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setEquipGroupsIsLoading(true))
    let data = await appAPI.setEquipGroupsData(id, name, isactive)
    if (data.resultCode === 0) {
        dispatch(appActions.setEquipGroups(data.groups))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setEquipGroupsIsLoading(false))
}

export const createNewDepartment = (name: string, name2: string, pos: string, fio: string, stat: string, setError: UseFormSetError<DepartmentsType>): ThunkType => async (dispatch) => {
    dispatch(appActions.setDepartmentsIsLoading(true))
    let data = await appAPI.createNewDepartment(name, name2, pos, fio, stat)
    if (data.resultCode === 0) {
        dispatch(appActions.setDepartments(data.items))
    } else if (data.resultCode === 1) {
        setError('name', {
            type: 'server',
            message: data.message
        })
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setDepartmentsIsLoading(false))
}

export const createNewVMPDepartment = (vmpname1: string, vmpname2: string, menuname: string, code: string, code2: string, datevmp: string, isactive: string, setError: UseFormSetError<VMPDepartmentsType>): ThunkType => async (dispatch) => {
    dispatch(appActions.setVMPDepartmentsIsLoading(true))
    let data = await appAPI.createNewVMPDepartment(vmpname1, vmpname2, menuname, code, code2, datevmp, isactive)
    if (data.resultCode === 0) {
        dispatch(appActions.setVMPDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
        setError('vmpname1', {
            type: 'server',
            message: data.message
        })
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setVMPDepartmentsIsLoading(false))
}

export const createNewEquipGroup = (name: string, isactive: string, setError: UseFormSetError<EquipGroupsType>): ThunkType => async (dispatch) => {
    dispatch(appActions.setEquipGroupsIsLoading(true))
    let data = await appAPI.createNewEquipGroup(name, isactive)
    if (data.resultCode === 0) {
        dispatch(appActions.setEquipGroups(data.groups))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
        setError('name', {
            type: 'server',
            message: data.message
        })
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setEquipGroupsIsLoading(false))
}

export const createNewPremMode = (type: string, low: string, hight: string, isactive: string, setError: UseFormSetError<PremModesType>): ThunkType => async (dispatch) => {
    dispatch(appActions.setPremModesIsLoading(true))
    let data = await appAPI.createNewPremMode(type, low, hight, isactive)
    if (data.resultCode === 0) {
        dispatch(appActions.setPremModes(data.modes))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
        setError('low', { message: data.message })
        setError('hight', { message: data.message })
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setPremModesIsLoading(false))
}

export const setVMPConsumers = (id: string, dataArray: string[]): ThunkType => async (dispatch) => {
    dispatch(appActions.setVMPDepartmentsIsLoading(true))
    let data = await appAPI.setVMPConsumers(id, dataArray)
    if (data.resultCode === 0) {
        dispatch(appActions.setVMPDepartments(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setVMPDepartmentsIsLoading(false))
}

export const getMonthPlanObjectData = (id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setAddToMonthPlanIsLoading(true))
    let data = await appAPI.getMonthPlanObjectData(id, objectType, month)

    let dataToState = {
        isPlanned: false,
        date1: '',
        date2: '',
        fio: '',
        workType: ''
    }

    if (data.resultCode === 0) {
        if (data.items) {
            dataToState = { ...data.items, isPlanned: true }
            dispatch(appActions.setMonthPlanObjectData(dataToState))
        } else {
            dispatch(appActions.setMonthPlanObjectData(dataToState))
        }
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setAddToMonthPlanIsLoading(false))
}

export const createObjectInMonthPlane = (id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', month: string): ThunkType => async (dispatch) => {
    dispatch(appActions.setAddToMonthPlanIsLoading(true))
    let data = await appAPI.createObjectInMonthPlane(id, objectType, month)

    let dataToState = {
        isPlanned: false,
        date1: '',
        date2: '',
        fio: '',
        workType: ''
    }

    if (data.resultCode === 0) {
        dataToState = { ...data.items, isPlanned: true }
        dispatch(appActions.setMonthPlanObjectData(dataToState))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
        dataToState = { ...data.items, isPlanned: false }
        dispatch(appActions.setMonthPlanObjectData(dataToState))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
    dispatch(appActions.setAddToMonthPlanIsLoading(false))
}

export const addReestrData = (id: string, objectType: 'equipment' | 'premises' | 'systems' | 'processes', nvp: string, dvp: string, nvo: string, dvo: string, typeval: string): ThunkType => async (dispatch) => {
    let data = await appAPI.addReestrData(id, objectType, nvp, dvp, nvo, dvo, typeval)
    if (data.resultCode === 0) {
        switch (objectType) {
            case 'equipment':
                return dispatch(getEquipReestrData(id))
            case 'premises':
                return dispatch(getPremReestrData(id))
            case 'processes':
                return dispatch(getProcReestrData(id))
            case 'systems':
                return dispatch(getSysReestrData(id))
            default:
                return null
        }
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getUserActions = (): ThunkType => async (dispatch) => {
    const data = await appAPI.getUserActions()
    if (data.resultCode === 0) {
        dispatch(appActions.setUserActions(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const getUserAccountsActions = (): ThunkType => async (dispatch) => {
    const data = await appAPI.getUserAccountsActions()
    if (data.resultCode === 0) {
        dispatch(appActions.setUserAccountsActions(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setIsInitializedAppStatus = (status: boolean): ThunkType => async (dispatch) => {
    dispatch(appActions.setIsInitializedAppStatus(status))
}

export const setErrorMessage = (text: string | null): ThunkType => async (dispatch) => {
    dispatch(appActions.setErrorMessage(text))
}

export const uploadCodeForm = (file: any): ThunkType => async (dispatch) => {
    dispatch(appActions.setLoadingMessage('Файл загружается...'))
    const data = await appAPI.uploadCodeForm(file)
    if (data.resultCode === 0) {
        dispatch(appActions.setLoadingMessage(null))
        dispatch(appActions.setSuccessMessage('Операция завершена успешно!'))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setLoadingMessage(null))
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(appActions.setLoadingMessage(null))
        dispatch(logout())
    }
}

export const getLabelTermSettings = (): ThunkType => async (dispatch) => {
    const data = await appAPI.getLabelTermSettings()
    if (data.resultCode === 0) {
        dispatch(appActions.setLabelTermSettings(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

export const setLabelTermSettings = (param: string): ThunkType => async (dispatch) => {
    const data = await appAPI.setLabelTermSettings(param)
    if (data.resultCode === 0) {
        dispatch(appActions.setLabelTermSettings(data.items))
    } else if (data.resultCode === 1) {
        dispatch(appActions.setErrorMessage(data.messages[0]))
    } else if (data.resultCode === 2) {
        dispatch(logout())
    }
}

type ActionTypes = InferActionsTypes<typeof appActions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionTypes>

export const appActions = {
    setEquipGroups: (data: EquipGroupsType[]) => ({ type: 'app/SET_EQUIP_GROUPS', data } as const),
    setDepartments: (data: DepartmentsType[]) => ({ type: 'app/SET_DEPARTMENTS', data } as const),
    setVMPDepartments: (data: VMPDepartmentsType[]) => ({ type: 'app/SET_VMP_DEPARTMENTS', data } as const),
    setPremModes: (data: PremModesType[]) => ({ type: 'app/SET_PREM_MODES', data } as const),
    setSopCodeForm: (data: string) => ({ type: 'app/SET_SOP_CODE_FORM', data } as const),
    setAllValidators: (data: AllValidatorsType[]) => ({ type: 'app/SET_ALL_VALIDATORS', data } as const),
    setVacationsData: (data: VacationsType[]) => ({ type: 'app/SET_VACATIONS_VATA', data } as const),
    setVacationsIsLoading: () => ({ type: 'app/SET_VACATIONS_IS_LOADING' } as const),
    setTheme: (themeType: 'dark' | 'light') => ({ type: 'app/SET_THEME', themeType } as const),
    setPainterData: (data: any) => ({ type: 'app/SET_PAINTER_DATA', data } as const),
    setCodeSettingsData: (data: CodeSettingsType[]) => ({ type: 'app/SET_CODE_SETTINGS_DATA', data } as const),
    setPremModesIsLoading: (status: boolean) => ({ type: 'app/SET_PREM_MODES_IS_LOADING', status } as const),
    setEquipGroupsIsLoading: (status: boolean) => ({ type: 'app/SET_EQUIP_GROUPS_IS_LOADING', status } as const),
    setDepartmentsIsLoading: (status: boolean) => ({ type: 'app/SET_DEPARTMENTS_IS_LOADING', status } as const),
    setVMPDepartmentsIsLoading: (status: boolean) => ({ type: 'app/SET_VMP_DEPARTMENTS_IS_LOADING', status } as const),
    setCodeFormsIsLoading: (status: boolean) => ({ type: 'app/SET_CODEFORMS_IS_LOADING', status } as const),
    setMonthPlanObjectData: (items: MonthPlanObjectData) => ({ type: 'app/SET_MONTH_PLAN_OBJECT_DATA', items } as const),
    setAddToMonthPlanIsLoading: (status: boolean) => ({ type: 'app/SET_ADD_TO_MONTH_PLAN_IS_LOADING', status } as const),
    setUserActions: (items: UserActionsType[]) => ({ type: 'app/SET_USER_ACTIONS', items } as const),
    setUserAccountsActions: (items: UserActionsType[]) => ({ type: 'app/SET_USER_ACCOUNTS_ACTIONS', items } as const),
    setIsInitializedAppStatus: (status: boolean) => ({ type: 'app/SET_IS_INITIALIZED_APP_STATUS', status } as const),
    setErrorMessage: (text: string | null) => ({ type: 'app/SET_ERROR_MESSAGE', text } as const),
    setSuccessMessage: (text: string | null) => ({ type: 'app/SET_SUCCESS_MESSAGE', text } as const),
    setLoadingMessage: (text: string | null) => ({ type: 'app/SET_LOADING_MESSAGE', text } as const),
    setLabelTermSettings: (text: string | null) => ({ type: 'app/SET_LABEL_TERM_SETTINGS', text } as const),
}