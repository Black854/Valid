import { equipmentAPI } from "../api/equipmentAPI"

type DataType = {
    id: string,
    sp: string,
    sp2: string,
    nomer: string,
    name: string,
    groupp: string,
    fio: string,
    manual: string,
    foto: string,
    manufacturer: string,
    manufacturdate: string,
    serial: string,
    inv: string,
    ar: string,
    date: string
}

let initialState = {
    data: [] as Array<DataType>,
    reestrData: [],
    isLoading: false
}

type InitialStateType = typeof initialState

const equipmentReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'PUSH_EQ_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'IS_LOADING':
            return {...state, isLoading: true}
        case 'PUSH_REESTR_DATA':
            return {...state, reestrData: action.data}
        default:
            return state
    }
}

export const getEquipment = () => async (dispatch: any) => {
    dispatch (setIsLoading())
    let data = await equipmentAPI.getEquipment()
    dispatch (pushEquipmentData(data.items))
}

export const getReestrData = (id: string) => async (dispatch: any) => {
    let data = await equipmentAPI.getReestrData(id)
    dispatch (pushReestrData(data.items))
}

export const uploadMainPhoto = (id:string, file: File) => async (dispatch: any) => {
    let data = await equipmentAPI.uploadMainPhoto(id, file)
    dispatch (getEquipment())
}

export const deleteMainPhoto = (id:string) => async (dispatch: any) => {
    let data = await equipmentAPI.deleteMainPhoto(id)
    dispatch (getEquipment())
}

const pushEquipmentData = (data: any) => {
    return {
        type: 'PUSH_EQ_DATA',
        data
    }
}

const pushReestrData = (data: any) => {
    return {
        type: 'PUSH_REESTR_DATA',
        data
    }
}

const setIsLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

export default equipmentReducer

