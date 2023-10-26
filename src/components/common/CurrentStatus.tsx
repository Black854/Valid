import { Typography } from "antd"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { getReestrDataSelector } from "../../redux/equipmentSelectors"
import { addMonths } from 'date-fns';
import { format } from 'date-fns';
import { getIntervalsByAr } from "../../redux/appSelectors";
import { AppStateType } from "../../redux/store";
const { Text } = Typography

type CurrentStatusPropsType = {
    ar: string
    fio: string
}

const CurrentStatus: React.FC<CurrentStatusPropsType> = ({ar, fio}) => {
    const interval = useSelector((state: AppStateType) => getIntervalsByAr(state, ar))
    const reestrData = useSelector(getReestrDataSelector)
    const maxDateObject = reestrData.reduce((max, obj) => {
        // Преобразовываем дату dvo в объект Date
        const currentDate = new Date(obj.dvo);
        // Преобразовываем максимальную дату в объект Date
        const maxDate = new Date(max.dvo);
      
        // Сравниваем текущую дату с максимальной датой
        return currentDate > maxDate ? obj : max;
    }, reestrData[0]); // Используем первый объект в качестве начальной максимальной даты
      
    console.log(maxDateObject.dvo);
    console.log(interval)
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
        return <Text type="danger">Выбран несуществующий тип интервала</Text>
    }
}

export default CurrentStatus