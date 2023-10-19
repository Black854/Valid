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
    isLoading: false
}

type InitialStateType = typeof initialState

const equipmentReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'PUSH_EQ_DATA':
            return {...state, data: action.data, isLoading: false}
        case 'IS_LOADING':
            return {...state, isLoading: true}
        default:
            return state
    }
}

export const getEquipment = () => async (dispatch: any) => {
    dispatch (setIsLoading())
    let data = await equipmentAPI.getEquipment()
    dispatch (pushEquipmentData(data.items))
}

const pushEquipmentData = (data: any) => {
    return {
        type: 'PUSH_EQ_DATA',
        data
    }
}

const setIsLoading = () => {
    return {
        type: 'IS_LOADING'
    }
}

export default equipmentReducer

