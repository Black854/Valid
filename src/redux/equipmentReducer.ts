import { equipmentAPI } from "../api/equipmentAPI"

type dataType = {
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
    data: [
        {"id":"1","sp":"ИЛ ОКК","sp2":"БХЛ","nomer":"436","name":"Мультигазовый инкубатор МСО-5AC (4)","groupp":"Термостаты","fio":"","manual":"uploads\/equipment\/1\/manual\/SM_MCO-5AC9910037-00_291208.pdf","foto":"uploads\/equipment\/1\/foto\/Снимок1.PNG","manufacturer":"Sanyo Electric Biomedical Co., Ltd., Japan","manufacturdate":"","serial":"14050036","inv":"II\/37-Б","ar":"3"},
        ] as Array<dataType>
}

type InitialStateType = typeof initialState

const equipmentReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case 'PUSH_EQ_DATA':
            return {...state, data: action.data}
        default:
            return state
    }
}

export const getEquipment = () => async (dispatch: any) => {
    let data = await equipmentAPI.getEquipment()
    dispatch (pushEquipmentData(data.items))
}

const pushEquipmentData = (data: any) => {
    return {
        type: 'PUSH_EQ_DATA',
        data
    }
}

export default equipmentReducer

