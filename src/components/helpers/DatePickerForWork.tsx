import { ConfigProvider, DatePicker, Input, Popconfirm, Typography } from 'antd'
import { format } from 'date-fns'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { updateReestrDatePrem } from '../../redux/premisesReducer'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import { datePickerLocale } from './datePickerLocale'

dayjs.locale('ru')
const { Text } = Typography

type ConvertDateType = {
    date: string | undefined
    id: string
    premId: string
    dateType: 'dvp' | 'dvo'
    group: 'equipment' | 'premises' | 'systems' | 'processes'
}

export const DatePickerForWork: React.FC<ConvertDateType> = ({id, premId, date, dateType, group}) => {
    const [isPopconfirmVisible, setPopconfirmVisible] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')
    const dispatch: AppDispatch = useDispatch()


    const handleDateChange = (date: any) => {
        setSelectedDate(date)
        setPopconfirmVisible(true)
    }

    const handleConfirm = () => {
        const date = new Date(selectedDate)
        let formattedSelectedDate = format(date, 'yyyy-MM-dd') // Текущая дата для сравнения с датой объекта
        formattedSelectedDate === '1970-01-01' && (formattedSelectedDate = '')
        dispatch(updateReestrDatePrem(id, premId, formattedSelectedDate, dateType))
        // Закрыть Popconfirm после подтверждения
        setPopconfirmVisible(false)
    }

    const handleCancel = () => {
        setPopconfirmVisible(false)
    }

    let dateFormat ="DD.MM.YYYY"
    
    const disabledDate = (current: any) => {
        // Получаем текущую дату
        const today = dayjs()
      
        // Сравниваем текущую дату с выбранной датой и заблокируем все даты после сегодняшней
        return current && current > today //добавить  сюда еще блокирование дат раньше предыдущего отчета
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
            return <Popconfirm
                        title="Подтверждение изменений"
                        description="Вы уверены, что хотите изменить данные?"
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                        okText="Да"
                        cancelText="Нет"
                        open={isPopconfirmVisible}
                        >
                            <DatePicker locale={datePickerLocale} size='small' status={date === '' ? 'warning' : undefined} allowClear disabledDate={disabledDate} format={'DD.MM.YYYY'} defaultValue={dayjs(date, dateFormat)} onChange={(date) => handleDateChange(date)}  />
                            
                    </Popconfirm>
        }
    } else {
        return <Popconfirm
                    title="Подтверждение изменений"
                    description="Вы уверены, что хотите изменить данные?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    okText="Да"
                    cancelText="Нет"
                    open={isPopconfirmVisible}
                    >
                    <DatePicker locale={datePickerLocale} size='small' status={date === '' ? 'warning' : undefined} allowClear disabledDate={disabledDate} format={'DD.MM.YYYY'} onChange={(date) => handleDateChange(date)}  />
                </Popconfirm>
    }
    return <></>
}