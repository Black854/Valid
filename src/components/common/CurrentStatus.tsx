import { Typography } from "antd"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { addMonths } from 'date-fns';
import { format } from 'date-fns';
import { getIntervalsByAr } from "../../redux/appSelectors";
import { AppStateType } from "../../redux/store";
import { getPremReestrDataSelector } from "../../redux/premisesSelectors";
import { getEquipReestrDataSelector } from "../../redux/equipmentSelectors"
import { ReestrType } from "../../redux/premisesReducer";
const { Text } = Typography

type CurrentStatusPropsType = {
    ar: string
    fio: string
    table: 'equipment' | 'premises' | 'systems' | 'processes'
}

export const CurrentStatus: React.FC<CurrentStatusPropsType> = ({ar, fio, table}) => {
    // console.log('ar - ' + ar)
    // console.log('fio - ' + fio)
    const interval = useSelector((state: AppStateType) => getIntervalsByAr(state, ar))
    const reestrEquipData = useSelector(getEquipReestrDataSelector)
    const reestrPremData = useSelector(getPremReestrDataSelector)
    let reestrData: ReestrType[] = []
    if (table === 'equipment') {
        reestrData = reestrEquipData;
    } else if (table === 'premises') {
        reestrData = reestrPremData;
    }
    // console.log('length - ' + reestrData.length)
    if ( reestrData.length !== 0 ) {
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
            // console.log('Текущая дата для сравнения - ' + formattedCurrentDate)
    
            const equipDate = new Date(maxDateObject.dvo)
            const resultEquipDate = addMonths(equipDate, numInterval); // Прибавляем monthCount месяцев
            const formattedEquipDate = format(resultEquipDate, 'yyyyMMdd'); // Текущая дата для сравнения с датой объекта
            // console.log('Дата квалификации объекта для сравнения - ' + formattedEquipDate)
            let dateForPrint = format(resultEquipDate, 'dd.MM.yyyy');
            if (ar === '0') { return <Text type="secondary">Не валидируется</Text> }
            else if (ar==='12') { return <Text type="secondary">Законсервировано</Text> }
            else if (ar==='15') { return <Text type="secondary">Списано</Text> }
            else if (ar==='11' || ar==='10') { return <Text type="secondary">До изменений</Text> }
            else if (formattedCurrentDate >= formattedEquipDate) {
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
            return <Text type="danger">Объект имеет несуществующий тип интервала</Text>
        }
    } else {
        return <Text type="warning">Отсутствуют данные о валидационных работах</Text>
    }
    
}