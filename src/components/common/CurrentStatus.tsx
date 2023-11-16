import { Typography } from "antd"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { addMonths } from 'date-fns';
import { format } from 'date-fns';
import { getIntervalsByAr } from "../../redux/Selectors/appSelectors";
import { AppStateType } from "../../redux/store";
import { getPremReestrDataSelector } from "../../redux/Selectors/premisesSelectors";
import { getEquipReestrDataSelector } from "../../redux/Selectors/equipmentSelectors"
import { PremReestrType } from "../../redux/Reducers/premisesReducer";
import { getSysReestrDataSelector } from "../../redux/Selectors/systemsSelectors";
import { getProcReestrDataSelector } from "../../redux/Selectors/processesSelectors";
const { Text } = Typography

type CurrentStatusPropsType = {
    ar: string
    fio: string
    table: 'equipment' | 'premises' | 'systems' | 'processes'
}

export const CurrentStatus: React.FC<CurrentStatusPropsType> = ({ar, fio, table}) => {
    const interval = useSelector((state: AppStateType) => getIntervalsByAr(state, ar))
    const reestrEquipData = useSelector(getEquipReestrDataSelector)
    const reestrPremData = useSelector(getPremReestrDataSelector)
    const reestrSysData = useSelector(getSysReestrDataSelector)
    const reestrProcData = useSelector(getProcReestrDataSelector)
    let reestrData: PremReestrType[] = []
    if (table === 'equipment') {
        reestrData = reestrEquipData
    } else if (table === 'premises') {
        reestrData = reestrPremData
    } else if (table === 'systems') {
        reestrData = reestrSysData
    } else if (table === 'processes') {
        reestrData = reestrProcData
    }
    if ( reestrData.length > 0 ) {
        const maxDateObject = reestrData.reduce((max, obj) => {
            // Преобразовываем дату dvo в объект Date
            const currentDate = new Date(obj.dvo);
            // Преобразовываем максимальную дату в объект Date
            const maxDate = new Date(max.dvo);
            // Сравниваем текущую дату с максимальной датой
            return currentDate > maxDate ? obj : max;
        }, reestrData[0]); // Используем первый объект в качестве начальной максимальной даты
        if (interval) {
            const numInterval = parseInt(interval, 10)
            const currentDate = new Date()
            const formattedCurrentDate = format(currentDate, 'yyyyMMdd'); // Текущая дата для сравнения с датой объекта
            if (maxDateObject.dvo !== '') {
                const objectDate = new Date(maxDateObject.dvo)
                const resultObjectDate = addMonths(objectDate, numInterval); // Прибавляем monthCount месяцев
                const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd'); // Текущая дата для сравнения с датой объекта
                let dateForPrint = format(resultObjectDate, 'dd.MM.yyyy');
                if (ar === '0') { return <Text type="secondary">Не валидируется</Text> }
                else if (ar==='12') { return <Text type="secondary">Законсервировано</Text> }
                else if (ar==='15') { return <Text type="secondary">Списано</Text> }
                else if (ar==='11' || ar==='10') { return <Text type="secondary">До изменений</Text> }
                else if (formattedCurrentDate >= formattedObjectDate) {
                    if (fio==='') {
                        return <Text type="danger">Просрочен с {dateForPrint}</Text> 
                    } else {
                        return <Text type="danger">Просрочен с {dateForPrint} (в работе у {fio})</Text> 
                    }
                }
                else {
                    if (fio==='') {
                        return <Text type="success">Действителен до {dateForPrint}</Text> 
                    } else {
                        return <Text type="success">Действителен до {dateForPrint} (в работе у {fio})</Text>
                    }
                }
            } else {
                return <Text type="warning">Отсутствуют данные о валидационных работах</Text>
            }
        } else {
            return <Text type="danger">Объект имеет несуществующий тип интервала</Text>
        }
    } else {
        return <Text type="warning">Отсутствуют данные о валидационных работах</Text>
    }
}