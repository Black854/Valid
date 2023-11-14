import { addMonths, subMonths } from 'date-fns'
import { format } from 'date-fns'
import { Typography } from 'antd'
const { Text } = Typography

type renderDateHelperType = {
    date: string
}

export const RenderDateHelperInstruments: React.FC<renderDateHelperType> = ({date}) => {
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
    const resultObjectDate = addMonths(objectDate, 0) // Прибавляем monthCount месяцев
    const formattedObjectDate = format(resultObjectDate, 'yyyyMMdd') // дата объекта для сравнения

    const resultObjectDateWithoutOneMonth = subMonths(resultObjectDate, 1) // Прибавляем monthCount месяцев
    const formattedObjectDateWithoutOneMonth = format(resultObjectDateWithoutOneMonth, 'yyyyMMdd') // дата объекта минус 1 месяц для сравнения
   
    let dateForPrint = format(resultObjectDate, 'dd.MM.yyyy')
    if (formattedCurrentDate >= formattedObjectDate) { return <Text type="danger">{dateForPrint}</Text> }
    else if (formattedObjectDate > formattedCurrentDate && formattedCurrentDate >= formattedObjectDateWithoutOneMonth) { return <Text type="warning">{dateForPrint}</Text> }
    else { return <Text type="success">{dateForPrint}</Text> }
}