import { DatePicker, Input, Popconfirm, Typography } from 'antd'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateReestrDate } from '../../redux/premisesReducer'
const { Text } = Typography

type ConvertDateType = {
    date: string | undefined
    id: string
    premId: string
    dateType: 'dvp' | 'dvo'
}

export const ConvertPremDate: React.FC<ConvertDateType> = ({id, premId, date, dateType}) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const dispatch: AppDispatch = useDispatch()

    console.log(date)

    const handleDateChange = (date: any) => {
        setSelectedDate(date)
        setPopconfirmVisible(true)
    }

    const handleConfirm = () => {
        const date = new Date(selectedDate)
        const formattedSelectedDate = format(date, 'yyyy-MM-dd') // Текущая дата для сравнения с датой объекта
        dispatch(updateReestrDate(id, premId, formattedSelectedDate, dateType))
        // Закрыть Popconfirm после подтверждения
        setPopconfirmVisible(false)
    }

    const handleCancel = () => {
        setPopconfirmVisible(false)
    }

    let dateFormat ="DD.MM.YYYY"


    if (date) {
        let parts = date.split('.') // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const day = parts[0]
            const month = parts[1]
            const year = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            return <Text>{date}</Text>
        }
    
        parts = date.split('-') // Разделяем строку по точкам
        if (parts.length === 3) {
            // Проверяем, что строка содержит три части: день, месяц и год
            const year = parts[0]
            const month = parts[1]
            const day = parts[2]
            // Создаем новую дату в формате "dd.MM.yyyy"
            const date = `${day}.${month}.${year}`
            
            return <Popconfirm
                        title="Подтверждение изменений"
                        description="Вы уверены, что хотите изменить данные?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Да"
                        cancelText="Нет"
                        open={isPopconfirmVisible}
                        >
                        <DatePicker size='small'  allowClear={false} format={'DD.MM.YYYY'} defaultValue={dayjs(date, dateFormat)} bordered={false} onChange={(date) => handleDateChange(date)}  />
                    </Popconfirm>
        }
    } else { // плохой метод. нужен условный вывод только для ворк листа
        return <Popconfirm
                        title="Подтверждение изменений"
                        description="Вы уверены, что хотите изменить данные?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Да"
                        cancelText="Нет"
                        open={isPopconfirmVisible}
                    >
                        <DatePicker size='small' allowClear={false} format={'DD.MM.YYYY'} bordered={false} onChange={(date) => handleDateChange(date)}  />
                    </Popconfirm>
    }
    return <></>
}