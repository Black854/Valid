import { addMonths, subMonths } from 'date-fns'
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
    if (ar === '0,5') { monthCount = 13 }
    else if (ar === '2') { monthCount = 25 }
    else if (ar === '3') { monthCount = 37 }
    else if (ar === '4') { monthCount = 37 }
    else if (ar === '5') { monthCount = 61 }
    else if (ar === '13') { monthCount = 7 }
    else if (ar === '14') { monthCount = 61 }
    else if (ar === '16') { monthCount = 61 }


    // { value: '0', label: 'Не валидируется', interval: '0' },
    //     { value: '0,5', label: '1 раз в год c промежуточным контролем', interval: '13'},
    //     { value: '13', label: '1 раз в полгода', interval: '7' },
    //     { value: '1', label: '1 раз в год', interval: '13' },
    //     { value: '2', label: '1 раз в 2 года', interval: '25' },
    //     { value: '3', label: '1 раз в 3 года', interval: '37' },
    //     { value: '4', label: '1 раз в 3 года (посезонно)', interval: '37' },
    //     { value: '5', label: '1 раз в 5 лет', interval: '61' },
    //     { value: '14', label: '1 раз в 5 лет (посезонно)', interval: '61' },
    //     { value: '16', label: '1 раз в 5 лет (без оформления ПОТС)', interval: '61' },
    //     { value: '10', label: 'По изменениям (с оформлением ПОТС)', interval: '0' },
    //     { value: '11', label: 'По изменениям (без оформления ПОТС)', interval: '0' },
    //     { value: '12', label: 'Законсервировано', interval: '0' },
    //     { value: '15', label: 'Списано', interval: '0' }

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