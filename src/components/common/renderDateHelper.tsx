import { addMonths, subMonths } from 'date-fns'
import { format } from 'date-fns'
import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { getTermSettingsSelector } from '../../redux/Selectors/appSelectors'
const { Text } = Typography

type renderDateHelperType = {
    date: string
    record: {
        ar: string
        date: string | null
    }
}

export const RenderDateHelper: React.FC<renderDateHelperType> = ({date, record}) => {
    let ar = record.ar
    let monthCount = 0

    const termSettings = useSelector(getTermSettingsSelector)
    const termSettingsNumber = termSettings ? parseInt(termSettings) : 0
    
    if (ar === '1') { monthCount = 12 + termSettingsNumber }
    if (ar === '0,5') { monthCount = 12 + termSettingsNumber }
    else if (ar === '2') { monthCount = 24 + termSettingsNumber }
    else if (ar === '3') { monthCount = 36 + termSettingsNumber }
    else if (ar === '4') { monthCount = 36 + termSettingsNumber }
    else if (ar === '5') { monthCount = 60 + termSettingsNumber }
    else if (ar === '13') { monthCount = 6 + termSettingsNumber }
    else if (ar === '14') { monthCount = 60 + termSettingsNumber }
    else if (ar === '16') { monthCount = 60 + termSettingsNumber }

    if (date) {
        const parts = date.split('.') // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const day = parts[0]
            const month = parts[1]
            const year = parts[2]
            // Создаем новую дату в формате "yyyy-MM-dd"
            date = `${year}-${month}-${day}`
        }
    }
    
    const currentDate = new Date()
    const formattedCurrentDate = format(currentDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта

    const objectDate = new Date(date)
    const resultObjectDate = addMonths(objectDate, monthCount) // Прибавляем monthCount месяцев
    const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

    const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
    const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
   
    let dateForPrint = format(resultObjectDate, 'dd.MM.yyyy')
    if (ar === '0') { return <Text type="secondary">Не валидируется</Text> }
    else if (ar==='12') { return <Text type="secondary">Законсервировано</Text> }
    else if (ar==='15') { return <Text type="secondary">Списано</Text> }
    else if (ar==='11' || ar==='10') { return <Text type="secondary">До изменений</Text> }
    else if (record.date === null) { return <Text type="warning">Нет данных</Text> }
    else if (formattedCurrentDate >= formattedObjectDate) { return <Text type="danger">{dateForPrint}</Text> }
    else if (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth) { return <Text type="warning">{dateForPrint}</Text> }
    else { return <Text type="success">{dateForPrint}</Text> }
}