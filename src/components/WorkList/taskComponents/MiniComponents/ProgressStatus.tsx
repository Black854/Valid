import { EquipReestrType } from "../../../../redux/Reducers/equipmentReducer"
import { PremReestrType } from "../../../../redux/Reducers/premisesReducer"
import { ProcReestrType } from "../../../../redux/Reducers/processesReducer"
import { SysReestrType } from "../../../../redux/Reducers/systemsReducer"
import { Progress } from "antd"
import { WorkChangesDataType } from "../../../../redux/Reducers/workReducer"

type RecordType = {
    objectType: "equipment" | "premises" | "systems" | "processes"
    id: string
    key: string
    sp2: string
    name: string
    nomer: string
    class: string
    mode: string
    date: string
    ar: string
    foto: string
    fio: string
}

type ProgresssHelper = {
    record: RecordType
    myPremData?: PremReestrType[]
    myEquipData?: EquipReestrType[]
    mySysData?: SysReestrType[]
    myProcData?: ProcReestrType[]
}

export const ProgressStatus: React.FC<ProgresssHelper> = ({ record, myPremData, myEquipData, mySysData, myProcData }) => {
    const widthScreen = window.innerWidth
    let a: number = 0
    let b: number = 1
    const thisObject = record.objectType === 'premises' ? myPremData?.find(e => e.idfromtable === record.id) :
        record.objectType === 'equipment' ? myEquipData?.find(e => e.idfromtable === record.id) :
            record.objectType === 'systems' ? mySysData?.find(e => e.idfromtable === record.id) :
                record.objectType === 'processes' ? myProcData?.find(e => e.idfromtable === record.id) : null
    if (record.objectType === 'premises') {
        if (thisObject?.typeval === '1') {
            if (record.class === 'Чистые' || record.class === 'Контролируемые') {
                b = 8
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
                a += thisObject?.isCardUpdated !== '' ? 1 : 0
            } else {
                if (record.mode === '2 - 8 ºC' || record.mode === 'минус 30 - 35 ºC') {
                    b = 11
                    a += thisObject?.vp !== '' ? 1 : 0
                    a += thisObject?.nvp !== '' ? 1 : 0
                    a += thisObject?.dvp !== '' ? 1 : 0
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                    a += thisObject?.pam !== '' ? 1 : 0
                    a += thisObject?.pam2 !== '' ? 1 : 0
                    a += thisObject?.season !== '0' ? 1 : 0
                    a += thisObject?.isCardUpdated !== '' ? 1 : 0
                } else {
                    b = 9
                    a += thisObject?.vp !== '' ? 1 : 0
                    a += thisObject?.nvp !== '' ? 1 : 0
                    a += thisObject?.dvp !== '' ? 1 : 0
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                    a += thisObject?.season !== '0' ? 1 : 0
                    a += thisObject?.isCardUpdated !== '' ? 1 : 0
                }
            }
        } else if (thisObject?.typeval === '3') {
            if (record.class === 'Чистые' || record.class === 'Контролируемые') {
                b = 4
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            } else {
                if (record.mode === '2 - 8 ºC' || record.mode === 'минус 30 - 35 ºC') {
                    b = 4
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                } else {
                    b = 4
                    a += thisObject?.vo !== '' ? 1 : 0
                    a += thisObject?.nvo !== '' ? 1 : 0
                    a += thisObject?.dvo !== '' ? 1 : 0
                    a += thisObject?.et !== '' ? 1 : 0
                }
            }
        }
    } else if (record.objectType === 'equipment') {
        if (thisObject?.typeval === '1') {
            if (record.class === 'Термостаты') {
                b = 10
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.pam !== '' ? 1 : 0
                a += thisObject?.pam2 !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
                a += thisObject?.isCardUpdated !== '' ? 1 : 0
            } else if (record.class === 'Термоконтейнеры') {
                b = 8
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.pam !== '' ? 1 : 0
                a += thisObject?.isCardUpdated !== '' ? 1 : 0
            } else {
                b = 8
                a += thisObject?.vp !== '' ? 1 : 0
                a += thisObject?.nvp !== '' ? 1 : 0
                a += thisObject?.dvp !== '' ? 1 : 0
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
                a += thisObject?.isCardUpdated !== '' ? 1 : 0
            }
        } else if (thisObject?.typeval === '3') {
            if (record.class === 'Термоконтейнеры') {
                b = 3
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
            } else {
                b = 4
                a += thisObject?.vo !== '' ? 1 : 0
                a += thisObject?.nvo !== '' ? 1 : 0
                a += thisObject?.dvo !== '' ? 1 : 0
                a += thisObject?.et !== '' ? 1 : 0
            }
        }
    } else if (record.objectType === 'systems') {
        if (thisObject?.typeval === '1') {
            b = 8
            a += thisObject?.vp !== '' ? 1 : 0
            a += thisObject?.nvp !== '' ? 1 : 0
            a += thisObject?.dvp !== '' ? 1 : 0
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
            a += thisObject?.et !== '' ? 1 : 0
            a += thisObject?.isCardUpdated !== '' ? 1 : 0
        } else if (thisObject?.typeval === '3') {
            b = 4
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
            a += thisObject?.et !== '' ? 1 : 0
        }
    } else if (record.objectType === 'processes') {
        if (thisObject?.typeval === '1') {
            b = 7
            a += thisObject?.vp !== '' ? 1 : 0
            a += thisObject?.nvp !== '' ? 1 : 0
            a += thisObject?.dvp !== '' ? 1 : 0
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
            a += thisObject?.isCardUpdated !== '' ? 1 : 0
        } else if (thisObject?.typeval === '3') {
            b = 3
            a += thisObject?.vo !== '' ? 1 : 0
            a += thisObject?.nvo !== '' ? 1 : 0
            a += thisObject?.dvo !== '' ? 1 : 0
        }
    }

    let c = Math.round((a / b) * 100)
    return <Progress type="dashboard" size={widthScreen < 1370 ? 220 : widthScreen < 1605 ? 250 : 250 } percent={c} status={c === 100 ? 'success' : 'normal'} success={{ percent: record.objectType === 'processes' ? c >= 50 ? c : 0 : 0 }} />
}