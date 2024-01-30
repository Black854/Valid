import { Typography } from "antd"
import { PremReestrType } from "../../redux/Reducers/premisesReducer"
import { EquipReestrType } from "../../redux/Reducers/equipmentReducer"
import { SysReestrType } from "../../redux/Reducers/systemsReducer"
import { ProcReestrType } from "../../redux/Reducers/processesReducer"

const { Text } = Typography

type ProgresssHelper = {
    record: any
    myPremData: PremReestrType[]
    myEquipData: EquipReestrType[]
    mySysData: SysReestrType[]
    myProcData: ProcReestrType[]
}

export const PlansComponent: React.FC<ProgresssHelper> = ({ record, myPremData, myEquipData, mySysData, myProcData }) => {
    const thisObject = record.objectType === 'premises' ? myPremData.find(e => e.idfromtable === record.id) :
        record.objectType === 'equipment' ? myEquipData.find(e => e.idfromtable === record.id) :
            record.objectType === 'systems' ? mySysData?.find(e => e.idfromtable === record.id) :
                record.objectType === 'processes' ? myProcData?.find(e => e.idfromtable === record.id) : null
    let b
    let c
    let currentYear = new Date().getFullYear()
    if (thisObject) {
        if (thisObject.type1) {
            const a = [
                { month: 'январь', days: thisObject.type1[1] },
                { month: 'февраль', days: thisObject.type1[2] },
                { month: 'март', days: thisObject.type1[3] },
                { month: 'апрель', days: thisObject.type1[4] },
                { month: 'май', days: thisObject.type1[5] },
                { month: 'июнь', days: thisObject.type1[6] },
                { month: 'июль', days: thisObject.type1[7] },
                { month: 'август', days: thisObject.type1[8] },
                { month: 'сентябрь', days: thisObject.type1[9] },
                { month: 'октябрь', days: thisObject.type1[10] },
                { month: 'ноябрь', days: thisObject.type1[11] },
                { month: 'декабрь', days: thisObject.type1[12] },
            ]
            b = a.filter(e => e.days !== '0').map(e => <Text style={{display: 'inline-block'}}>Квалификация на {e.month} {currentYear}</Text>)
        }

        if (thisObject.type2) {
            const a = [
                { month: 'январь', days: thisObject.type2[1] },
                { month: 'февраль', days: thisObject.type2[2] },
                { month: 'март', days: thisObject.type2[3] },
                { month: 'апрель', days: thisObject.type2[4] },
                { month: 'май', days: thisObject.type2[5] },
                { month: 'июнь', days: thisObject.type2[6] },
                { month: 'июль', days: thisObject.type2[7] },
                { month: 'август', days: thisObject.type2[8] },
                { month: 'сентябрь', days: thisObject.type2[9] },
                { month: 'октябрь', days: thisObject.type2[10] },
                { month: 'ноябрь', days: thisObject.type2[11] },
                { month: 'декабрь', days: thisObject.type2[12] },
            ]
            c = a.filter(e => e.days !== '0').map(e => <Text style={{display: 'inline-block'}}>Оценка на {e.month} {currentYear}</Text>)
        }

        return !thisObject.type1 && !thisObject.type2 ? <Text>Не запланировано</Text> : <>{b} {c}</>
    } else {
        return <Text>Не запланировано</Text>
    }
}