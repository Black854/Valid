import { DatePicker, Input, Popconfirm, Typography } from 'antd'
import dayjs from 'dayjs'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateReestrDate } from '../../redux/equipmentReducer'
import { AppDispatch } from '../../redux/store'
const { Text } = Typography

type ConvertDateType = {
    date: string | undefined
    id: string
    equipId: string
    dateType: 'dvp' | 'dvo'
}

export const ConvertDate: React.FC<ConvertDateType> = ({id, equipId, date, dateType}) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const dispatch: AppDispatch = useDispatch()


    const handleDateChange = (date: any) => {
        setSelectedDate(date)
        setPopconfirmVisible(true)
    }

    const handleConfirm = () => {
        const date = new Date(selectedDate)
        const formattedSelectedDate = format(date, 'yyyy-MM-dd') // Текущая дата для сравнения с датой объекта
        dispatch(updateReestrDate(id, equipId, formattedSelectedDate, dateType))
        // Закрыть Popconfirm после подтверждения
        setPopconfirmVisible(false)
    }

    const handleCancel = () => {
        setPopconfirmVisible(false)
    }

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
            
            let dateFormat ="DD.MM.YYYY"
            return <Popconfirm
                        title="Подтверждение изменений"
                        description="Вы уверены, что хотите изменить данные?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Да"
                        cancelText="Нет"
                        open={isPopconfirmVisible}

                    >
                        <DatePicker style={{width: '100%'}} suffixIcon={null} allowClear={false} format={'DD.MM.YYYY'} defaultValue={dayjs(date, dateFormat)} bordered={false} onChange={(date) => handleDateChange(date)}  />
                    </Popconfirm>
        }
    }
    return <></>
}