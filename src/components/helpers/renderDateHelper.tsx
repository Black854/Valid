import { addMonths } from 'date-fns'
import { format } from 'date-fns'
import { Typography } from 'antd'
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
    if (ar === '1') { monthCount = 13 }
    else if (ar === '2') { monthCount = 25 }
    else if (ar === '3') { monthCount = 37 }
    else if (ar === '5') { monthCount = 61 }

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

    const equipDate = new Date(date)
    const resultEquipDate = addMonths(equipDate, monthCount) // Прибавляем monthCount месяцев
    const formattedEquipDate = format(resultEquipDate, 'yyyyMMdd') // Текущая дата для сравнения с датой объекта
   
    let dateForPrint = format(resultEquipDate, 'dd.MM.yyyy')
    if (ar === '0') { return <Text type="secondary">Не валидируется</Text> }
    else if (ar==='12') { return <Text type="secondary">Законсервировано</Text> }
    else if (ar==='15') { return <Text type="secondary">Списано</Text> }
    else if (ar==='11' || ar==='10') { return <Text type="secondary">До изменений</Text> }
    else if (record.date === null) { return <Text type="danger">Нет данных</Text> }
    else if (formattedCurrentDate >= formattedEquipDate) { return <Text type="danger">{dateForPrint}</Text> }
    else { return <Text type="success">{dateForPrint}</Text> }
}